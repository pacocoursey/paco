/*

TODO:

- CommandCore: how to handle virtualization?

- CommandCore: should wrap with Dialog by default or let user do it?
  - Nope, let the user do it.

- useCommand: where should keybinds be registered? don't want global window
  - Pass {element} to useCommand(). Or do it yourself.

*/

import {
  createContext,
  useContext,
  useRef,
  forwardRef,
  useCallback,
  useEffect
} from 'react'
import { useId } from '@reach/auto-id'
import {
  createDescendantContext,
  DescendantProvider,
  useDescendant
} from '@reach/descendants'

const DescendantContext = createDescendantContext('CommandDescendantContext')
const CommandContext = createContext({
  listId: '',
  label: '',
  selected: -1,
  setSelected: () => {},
  search: ''
})
const useCommandCtx = () => useContext(CommandContext)

const CommandCore = forwardRef(
  (
    {
      children,
      'aria-label': label,
      open,
      selected,
      setSelected,
      search,
      className
    },
    ref
  ) => {
    const listId = useId()

    const context = {
      listId,
      label,
      selected,
      setSelected,
      search
    }

    if (selected === undefined) {
      throw new Error(`Missing required props in Command.
    - Did you mean to use 'cmd/uncontrolled'?`)
    }

    return (
      <CommandContext.Provider value={context}>
        <div data-command="" className={className} ref={ref}>
          {children}
        </div>
      </CommandContext.Provider>
    )
  }
)

export { CommandCore as Command }

export const CommandList = forwardRef(
  ({ descendants, setDescendants, children, ...props }, ref) => {
    const { listId } = useCommandCtx()

    if (!descendants || !setDescendants) {
      throw new Error(
        `Missing descendants in CommandList.
        - Did you mean to import from 'cmd/uncontrolled'?
        - If using useCommand, remember to pass {...listProps}.`
      )
    }

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

const CommandItemInner = ({ children, callback, ...props }) => {
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

  useEffect(() => {
    // This item has become active, scroll it into view
    if (isActive && ref.current) {
      ref.current.scrollIntoView({
        block: 'nearest'
      })
    }
  }, [isActive])

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
