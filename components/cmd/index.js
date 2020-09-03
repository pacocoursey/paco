import {
  createContext,
  useContext,
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect
} from 'react'
import { useId } from '@reach/auto-id'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { useDescendant, createDescendants } from '@lib/descendants'
import mergeRefs from 'react-merge-refs'

const CommandContext = createContext({
  listId: '',
  label: '',
  selected: -1,
  setSelected: () => {},
  search: ''
})

const useCommandCtx = () => useContext(CommandContext)

export const Command = forwardRef(
  (
    {
      children,
      'aria-label': label,
      open,
      selected,
      setSelected,
      search,
      className,
      overlayClassName,
      onDismiss,
      filterList,
      ...props
    },
    ref
  ) => {
    const listId = useId()

    const context = {
      listId,
      label,
      selected,
      setSelected,
      search,
      filterList
    }

    if (selected === undefined) {
      throw new Error(`Missing required props in Command.
    - Did you mean to use 'cmd/uncontrolled'?`)
    }

    return (
      <CommandContext.Provider value={context}>
        <DialogOverlay
          isOpen={open}
          className={overlayClassName}
          data-command-overlay=""
          onDismiss={onDismiss}
        >
          <DialogContent
            className={className}
            data-command=""
            aria-label={label}
            {...props}
          >
            {children}
          </DialogContent>
        </DialogOverlay>
      </CommandContext.Provider>
    )
  }
)

Command.displayName = 'Command'

const DescendantContext = createDescendants()

export const CommandList = forwardRef(
  ({ children, listRef, list, map, force, ...props }, ref) => {
    const { listId } = useCommandCtx()

    useLayoutEffect(() => {
      if (!listRef.current) return

      // We cannot rely on filterList.element because the DOM node could be outdated
      // but it would be an optimization: only loop over a pre-calculated array once
      // compared to selectAll → sort → forEach (n*3?)

      const groupList = new Map()

      // Use an up to date DOM list
      Array.from(listRef.current.querySelectorAll('[data-descendant]'))
        .sort((a, b) => {
          return a.getAttribute('data-order') - b.getAttribute('data-order')
        })
        .forEach(item => {
          if (item.parentElement) {
            // Re-insert into parent (does nothing if only child)
            item.parentElement.appendChild(item)

            const topEl = item.closest('[data-command-list] > *')

            if (!topEl || topEl === item || topEl === listRef.current) {
              // Item is already at the top level, no point
              return
            }

            // Skip if we already re-inserted this top level element
            if (groupList.has(topEl)) {
              return
            }

            listRef.current.appendChild(topEl)
            groupList.set(topEl, true)
          }
        })
    })

    return (
      <>
        <ul
          ref={mergeRefs([listRef, ref])}
          role="listbox"
          id={listId}
          data-command-list=""
          data-command-list-empty={list.current.length === 0 ? '' : undefined}
          {...props}
        >
          <DescendantContext.Provider value={{ list, map, force }}>
            {children}
          </DescendantContext.Provider>
        </ul>

        {list.current.length > 0 && (
          <div
            aria-live="polite"
            role="status"
            data-command-list-results=""
            // We'll manually add styles here: should be SR only
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
            {list.current.length} result{list.current.length > 1 ? 's' : ''}{' '}
            available.
          </div>
        )}
      </>
    )
  }
)

CommandList.displayName = 'CommandList'

export const CommandItem = ({ children, callback, ...props }) => {
  const { selected, setSelected, filterList: list } = useCommandCtx()
  const { index, ref, id } = useDescendant(DescendantContext, {
    callback,
    ...props
  })
  const { map } = useContext(DescendantContext)
  const hasUpdatedMap = map.current.has(id)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive])

  const order =
    list && hasUpdatedMap
      ? list.findIndex(([itemId]) => {
          return itemId === id
        })
      : -2

  if (order === -1) {
    return null
  }

  return (
    <li
      ref={ref}
      onClick={callback}
      data-order={order}
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

CommandInput.displayName = 'CommandInput'

function throttle(fn, interval) {
  let pending = false
  return (...args) => {
    if (pending) return
    pending = true
    fn(...args)
    setTimeout(() => (pending = false), interval)
  }
}
