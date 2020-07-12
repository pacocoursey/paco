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

const DescendantContext = createDescendantContext('List')
const CommandContext = createContext({})
const useCommandCtx = () => useContext(CommandContext)

export function Command({
  children,
  'aria-label': label,
  open,
  onDismiss,
  selected,
  setSelected,
  className,
  overlayClassName
}) {
  const listId = useId()

  const context = {
    listId,
    label,
    selected,
    setSelected
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

export function CommandList({ descendants, setDescendants, children }) {
  const { listId } = useCommandCtx()

  return (
    <>
      <ul
        role="listbox"
        id={listId}
        data-command-list=""
        data-command-list-empty={descendants.length === 0 ? '' : undefined}
      >
        <DescendantProvider
          context={DescendantContext}
          items={descendants}
          set={setDescendants}
        >
          {children}
        </DescendantProvider>
      </ul>

      {descendants.length > 0 && (
        <div aria-live="polite" role="status" data-command-list-results="">
          {descendants.length} results available.
        </div>
      )}
    </>
  )
}

export function CommandItem({ children, callback }) {
  const ref = useRef()
  const { selected, setSelected } = useCommandCtx()

  const index = useDescendant(
    {
      element: ref.current,
      callback
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
