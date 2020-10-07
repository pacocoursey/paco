import React, {
  Fragment,
  createContext,
  useMemo,
  useContext,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  useLayoutEffect
} from 'react'
import clsx from 'clsx'
import { useId } from '@reach/auto-id'
import mergeRefs from 'react-merge-refs'
import { useDescendant, createDescendants } from 'use-descendants'
export { default as useCommand } from './use-command'
export { default as usePages } from './use-pages'

const CommandContext = createContext({})
const useCommandCtx = () => useContext(CommandContext)

export const Command = forwardRef(
  (
    {
      // Props that are specifically used by Command, not forwarded
      label,
      className,
      children,
      // Props forwarded via Context
      ...props
    },
    ref
  ) => {
    const listId = useId()
    const inputId = useId()

    const context = useMemo(
      () => ({
        listId,
        inputId,
        ...props
      }),
      [listId, inputId, props]
    )

    return (
      <CommandContext.Provider value={context}>
        <div data-command="" className={className}>
          {/* Should be SR only, just used for labelling */}
          <label htmlFor={inputId} style={srOnlyStyles}>
            {label}
          </label>
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

  useIsomorphicLayoutEffect(() => {
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
          // We'll manually add styles here: should be SR only
          style={srOnlyStyles}
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
      className={clsx(itemClass, {
        [selectedItemClass]: isActive
      })}
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
  const { listId, inputId, search, setSearch } = useCommandCtx()

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
      id={inputId}
      data-command-input=""
    />
  )
})

CommandInput.displayName = 'CommandInput'

export const CommandGroup = ({ children, heading, separator, ...props }) => {
  const headingId = useId()
  const ref = useRef()
  const [show, setShow] = useState(true)

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return
    const count = ref.current.children.length
    setShow(count !== 0)
  })

  return (
    <>
      {separator && <CommandSeparator />}
      <li
        data-command-group=""
        role="presentation"
        {...props}
        style={
          show
            ? undefined
            : {
                display: 'none'
              }
        }
      >
        <div aria-hidden id={headingId}>
          {heading}
        </div>
        <ul role="group" aria-labelledby={headingId} ref={ref}>
          {children}
        </ul>
      </li>
    </>
  )
}

const CommandSeparator = () => {
  return <li data-command-separator="" role="separator" />
}

// Helpers

function throttle(fn, interval) {
  let pending = false
  return (...args) => {
    if (pending) return
    pending = true
    fn(...args)
    setTimeout(() => (pending = false), interval)
  }
}

const srOnlyStyles = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: '0'
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' && window?.document?.createElement
    ? useLayoutEffect
    : useEffect
