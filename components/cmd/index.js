import {
  createContext,
  useContext,
  useRef,
  forwardRef,
  useCallback
} from 'react'
import { useId } from '@reach/auto-id'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import {
  createDescendantContext,
  DescendantProvider,
  useDescendant
} from '@reach/descendants'

export const DescendantContext = createDescendantContext(
  'CommandDescendantContext'
)
const CommandContext = createContext({
  listId: '',
  label: '',
  selected: -1,
  setSelected: () => {},
  search: ''
})
const useCommandCtx = () => useContext(CommandContext)

const CommandCore = ({
  children,
  'aria-label': label,
  open,
  selected,
  setSelected,
  search,
  onDismiss,
  className,
  overlayClassName
}) => {
  const listId = useId()

  const context = {
    listId,
    label,
    selected,
    setSelected,
    search
  }

  return (
    <CommandContext.Provider value={context}>
      <DialogOverlay
        isOpen={open}
        className={overlayClassName}
        data-command-overlay=""
        onDismiss={onDismiss}
      >
        <DialogContent className={className} data-command="" aria-label={label}>
          {children}
        </DialogContent>
      </DialogOverlay>
    </CommandContext.Provider>
  )
}

export { CommandCore as Command }

export const CommandList = forwardRef(
  ({ descendants, setDescendants, children, ...props }, ref) => {
    const { listId } = useCommandCtx()

    return (
      <>
        <ul
          ref={ref}
          role="listbox"
          id={listId}
          data-command-list=""
          data-command-list-empty={descendants.length === 0 ? '' : undefined}
          {...props}
        >
          <DescendantProvider
            // @ts-ignore Ye idk how to fix this, types suck
            context={DescendantContext}
            items={descendants}
            set={setDescendants}
          >
            {children}
          </DescendantProvider>
        </ul>

        {descendants.length > 0 && (
          <div
            aria-live="polite"
            role="status"
            data-command-list-results=""
            // We'll manually add styles h1ere: should be SR only
            style={{
              border: 0,
              padding: 0,
              clip: 'rect(0 0 0 0)',
              clipPath: 'inset(100%)',
              height: 1,
              width: 1,
              margin: -1,
              overflow: 'hidden',
              position: 'absolute',
              appearance: 'none',
              whiteSpace: 'nowrap',
              wordWrap: 'normal'
            }}
          >
            {descendants.length} results available.
          </div>
        )}
      </>
    )
  }
)

const FilterContext = createContext(null)
export const useFilter = () => useContext(FilterContext)

export const Filter = ({ filter, children }) => {
  return (
    <FilterContext.Provider value={filter}>{children}</FilterContext.Provider>
  )
}

export const CommandItem = props => {
  const filter = useFilter()
  const { search } = useCommandCtx()

  const shouldRender =
    typeof filter === 'function' ? filter(props, search) : true

  if (shouldRender) {
    return <CommandItemInner {...props} />
  }

  return null
}

export const CommandItemInner = ({ children, callback, ...props }) => {
  const ref = useRef(null)
  const { selected, setSelected } = useCommandCtx()

  const index = useDescendant(
    {
      element: ref.current,
      callback,
      ...props
    },
    DescendantContext
  )

  const isActive = selected === index

  const handleMouse = useCallback(
    throttle(() => {
      requestAnimationFrame(() => {
        setSelected(index)
      })
    }, 50),
    [setSelected, index]
  )

  return (
    <li
      ref={ref}
      onClick={callback}
      // Have to use mouseMove instead of mouseEnter, consider:
      // mouse over item 1, press down arrow, move mouse inside of item 1
      // active item should be item 1 again, not item 2
      onMouseMove={handleMouse}
      // a11y
      tabIndex={-1}
      aria-selected={isActive || undefined}
      role="option"
      data-command-item=""
    >
      {children}
    </li>
  )
}

export const CommandInput = forwardRef(({ ...props }, ref) => {
  const { listId, label } = useCommandCtx()

  return (
    <input
      ref={ref}
      {...props}
      type="text"
      // a11y
      aria-expanded={true}
      aria-autocomplete="list"
      autoComplete="off"
      role="combobox"
      aria-label={label}
      aria-owns={listId}
      data-command-input=""
    />
  )
})

function throttle(fn, interval) {
  let pending = false
  return (...args) => {
    if (pending) return
    pending = true
    fn(...args)
    setTimeout(() => (pending = false), interval)
  }
}