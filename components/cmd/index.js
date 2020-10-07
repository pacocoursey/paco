import React, {
  Fragment,
  createContext,
  useMemo,
  useContext,
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect
} from 'react'
import { useId } from '@reach/auto-id'
import mergeRefs from 'react-merge-refs'
import { useDescendant, createDescendants } from 'use-descendants'
export { default as useCommand } from './use-command'

const CommandContext = createContext({})
const useCommandCtx = () => useContext(CommandContext)

export const Command = forwardRef(
  (
    {
      // Props that are specifically used by Command, not forwarded
      className,
      children,
      // Props forwarded via Context
      ...props
    },
    ref
  ) => {
    const listId = useId()

    const context = useMemo(
      () => ({
        listId,
        ...props
      }),
      [listId, props]
    )

    return (
      <CommandContext.Provider value={context}>
        <div data-command="" className={className}>
          {children}
        </div>
      </CommandContext.Provider>
    )
  }
)

Command.displayName = 'Command'

const DescendantContext = createDescendants()

export const CommandList = forwardRef(({ children, ...props }, ref) => {
  const { listId, ordering, listRef, map, list, force } = useCommandCtx()

  useLayoutEffect(() => {
    if (!ordering) return
    if (!listRef.current) return

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

  const DescendantProps = useMemo(() => {
    return { list, map, force }
  }, [list, map, force])

  return (
    <Fragment>
      <ul
        ref={mergeRefs([listRef, ref])}
        role="listbox"
        id={listId}
        data-command-list=""
        data-command-list-empty={list.current.length === 0 ? '' : undefined}
        {...props}
      >
        <DescendantContext.Provider value={DescendantProps}>
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
    </Fragment>
  )
})

CommandList.displayName = 'CommandList'

export const CommandItem = forwardRef(({ children, ...props }, ref) => {
  const {
    selected,
    setSelected,
    filterList: list,
    search,
    ordering,
    map,
    itemClass,
    selectedItemClass
  } = useCommandCtx()
  const { index, ref: descendantRef, id } = useDescendant(
    DescendantContext,
    props
  )
  const hasUpdatedMap = !!map.current[id]

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
    if (isActive && descendantRef.current) {
      descendantRef.current.scrollIntoView({
        block: 'nearest'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive])

  const order =
    !!list && hasUpdatedMap
      ? list.findIndex(({ _internalId }) => {
          return _internalId === id
        })
      : undefined

  // First match
  useEffect(() => {
    if (order === 0) {
      setSelected(index)
    }
  }, [search, index, order, setSelected])

  if (ordering) {
    if (order === -1) {
      return null
    }
  }

  return (
    <li
      ref={mergeRefs([descendantRef, ref])}
      onClick={props.callback}
      data-order={order}
      className={
        isActive
          ? selectedItemClass
            ? itemClass + ' ' + selectedItemClass
            : itemClass
          : itemClass
      }
      // Have to use mouseMove instead of mouseEnter, consider:
      // mouse over item 1, press down arrow, move mouse inside of item 1
      // active item should be item 1 again, not item 2
      onMouseMove={handleMouse}
      // a11y
      aria-selected={isActive || undefined}
      role="option"
      data-command-item=""
      data-command-selected={isActive ? '' : undefined}
    >
      {children}
    </li>
  )
})

CommandItem.displayName = 'CommandItem'

export const CommandInput = forwardRef(({ ...props }, ref) => {
  const { listId, search, setSearch } = useCommandCtx()

  return (
    <input
      ref={ref}
      value={search}
      onChange={setSearch}
      // These props can override the value/onChange stuff if the user
      // wants to control it manually
      {...props}
      type="text"
      // a11y
      // https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html
      aria-expanded={true} // The listbox (results) is always shown
      aria-autocomplete="list"
      aria-haspopup="listbox"
      autoComplete="off"
      role="combobox"
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
