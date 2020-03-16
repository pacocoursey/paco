import {
  memo,
  Fragment,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useReducer
} from 'react'
import Portal from '@reach/portal'
import cn from 'classnames'
import matchSorter from 'match-sorter'
import { useId } from '@reach/auto-id'
import { Transition } from 'react-transition-group'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

import toPx from './to-px'
import KeyHandler from './key-handler'
import styles from './command.module.css'

const divider = <li className={styles.divider} />

// These children should not change often
const Label = memo(({ children }) => {
  return <li className={styles.label}>{children}</li>
})

Label.displayName = 'Label'

const Item = ({
  active,
  icon,
  name,
  callback,
  onMouseMove,
  keybind,
  divider: hasDivider,
  index
}) => {
  const itemRef = useRef()

  useEffect(() => {
    // This item has become active, scroll it into view
    if (active && itemRef.current) {
      itemRef.current.scrollIntoView({
        block: 'nearest'
      })
    }
  }, [active])

  return (
    <>
      {hasDivider && divider}
      <li
        ref={itemRef}
        className={cn(styles.item, { [styles.active]: active })}
        onClick={callback}
        onMouseMove={onMouseMove}
        role="option"
        tabIndex={-1}
        data-command-option-index={index}
        aria-selected={active}
      >
        <div className={styles.left}>
          <span className={styles.icon}>{icon}</span>
          <span>{name}</span>
        </div>

        {keybind && (
          <span className={styles.keybind}>
            {keybind.includes(' ') ? (
              keybind.split(' ').map(key => {
                return <kbd key={`item-${name}-keybind-${key}`}>{key}</kbd>
              })
            ) : (
              <kbd>{keybind}</kbd>
            )}
          </span>
        )}
      </li>
    </>
  )
}

const renderItem = ({ item, index, ...rest }) => {
  if (item.collection) {
    return (
      <Fragment key={`command-collection-${item.name}-${index}`}>
        <Label>{item.name}</Label>
        {item.items.map((subItem, i) =>
          renderItem({ item: subItem, index: index + i, ...rest })
        )}
      </Fragment>
    )
  }

  const { updateOptions, active, setActive } = rest

  let cb = item.callback

  if (item.items) {
    cb = () => updateOptions(item.items)
  }

  return (
    <Item
      {...item}
      key={`command-option-${item.name}-${index}`}
      index={index}
      active={active === index}
      onMouseMove={() => setActive(index)}
      callback={cb}
    />
  )
}

const renderItems = ({ items, active, setActive, updateOptions }) => {
  let count = 0

  return items.map(item => {
    const x = renderItem({
      item,
      index: count,
      active,
      setActive,
      updateOptions
    })

    if (item.collection) {
      count += item.items.length
    } else {
      count++
    }

    return x
  })
}

const flatten = i =>
  i
    .map(item => {
      if (item.collection) return flatten(item.items)
      return item
    })
    .flat()

const reducer = (state, action) => {
  switch (action.type) {
    case 'close':
      if (state.open === false) return state
      return { ...state, open: false }
    case 'open':
      if (state.open === true) return state
      return { ...state, open: true }
    case 'update':
      return {
        ...state,
        items: action.options || action.items,
        options: action.options || state.options,
        active: 0
      }
    case 'refresh':
      return {
        ...state,
        items: action.options,
        options: action.options
      }
    case 'setActive':
      if (state.active === action.active) return state
      return {
        ...state,
        active: action.active
      }
    default:
      throw new Error(`Invalid reducer action: ${action.type}`)
  }
}

const Command = ({
  open: propOpen = false,
  options: defaultOptions,
  max = 10,
  height = 60,
  width = 640,
  top,
  placeholder,
  closeOnCallback = true,
  keybind = 'Meta+k, Control+k',
  searchOn,
  children
}) => {
  const listID = useId()
  const inputRef = useRef(null)
  const nestedRef = useRef(null)
  const [state, dispatch] = useReducer(reducer, {
    open: propOpen,
    active: 0,
    options: defaultOptions,
    items: defaultOptions
  })
  const { open, active, options, items } = state
  const flatItems = flatten(items)

  // Callbacks
  const listRef = useCallback(node => {
    if (node) {
      disableBodyScroll(node)
    }
  }, [])

  const toggle = useCallback(
    value => {
      if (value === false || open === true) {
        clearAllBodyScrollLocks()
        dispatch({ type: 'close' })
        return
      }

      // Open
      dispatch({ type: 'open' })
    },
    [open]
  )

  const searchableAttributes = useMemo(() => {
    if (!searchOn) return []

    if (!Array.isArray(searchOn)) {
      throw new Error('search prop must be an array.')
    }

    return searchOn.map(attr => {
      return i =>
        typeof i[attr] === 'string' ? !i.collection && i[attr] : null
    })
  }, [searchOn])

  const keybindHandler = useMemo(() => {
    return new KeyHandler(keybind)
  }, [keybind])

  const handleToggleKeybind = useCallback(
    e => {
      if (e.key === 'Escape') {
        return toggle(false)
      }

      if (keybindHandler) {
        keybindHandler.setCallback(toggle)
        keybindHandler.handle(e)
      }
    },
    [toggle, keybindHandler]
  )

  const onChange = useCallback(
    e => {
      if (!e.target.value) {
        dispatch({ type: 'update', items: options })
      }

      // TODO: support searching entire collections (likely needs match-sorter fork)
      const x = matchSorter(options, e.target.value, {
        keys: [
          item => (item.collection ? undefined : item.name),
          item => (item.collection ? item.items.map(i => i.name) : undefined),
          ...searchableAttributes
        ]
      })

      // Unfortunately have to run matchSorter twice, nested values are not returned
      // https://github.com/kentcdodds/match-sorter/issues/87
      const y = x.map(i => {
        if (i.collection) {
          return {
            ...i,
            items: matchSorter(i.items, e.target.value, { keys: ['name'] })
          }
        }

        return i
      })

      dispatch({ type: 'update', items: y })
    },
    [options, searchableAttributes]
  )

  const bounce = useCallback(() => {
    if (inputRef.current) {
      // Bounce the UI slightly
      const command = inputRef.current.closest('div')
      command.style.transform = 'scale(0.99)'
      // Not exactly safe, but should be OK
      setTimeout(() => {
        command.style.transform = null
      }, 100)
    }
  }, [])

  const handleNested = useCallback(
    (i, isNested = true) => {
      dispatch({ type: 'update', options: i, items: i })
      nestedRef.current = isNested

      if (inputRef.current) {
        // Reset the input
        inputRef.current.value = ''
        bounce()
      }

      if (isNested && flatItems[active].callback) {
        flatItems[active].callback()
      }
    },
    [flatItems, active, bounce]
  )

  const onKeyDown = useCallback(
    e => {
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()

          if (active < flatItems.length - 1) {
            dispatch({ type: 'setActive', active: active + 1 })
          }
          break
        }
        case 'ArrowUp':
          e.preventDefault()

          if (active > 0) {
            dispatch({ type: 'setActive', active: active - 1 })
          }
          break
        case 'ArrowLeft':
          if (
            inputRef.current &&
            !inputRef.current.value &&
            nestedRef.current === true
          ) {
            handleNested(defaultOptions, false)
          }
          return
        case 'Enter':
          if (!flatItems.length) return

          // Update items to nested list
          if (flatItems[active].items) {
            handleNested(flatItems[active].items)
          } else {
            if (flatItems[active].callback) {
              flatItems[active].callback()
            }

            if (
              closeOnCallback &&
              flatItems[active].closeOnCallback !== false
            ) {
              toggle(false)
            }
          }
          break
        default:
          break
      }
    },
    [active, flatItems, handleNested, defaultOptions, closeOnCallback, toggle]
  )

  const reset = useCallback(() => {
    dispatch({ type: 'update', options: defaultOptions })
    nestedRef.current = false
  }, [defaultOptions])

  // Effects
  useEffect(() => {
    // Register toggle keybind and escape handler
    window.addEventListener('keydown', handleToggleKeybind)

    return () => {
      clearAllBodyScrollLocks()
      window.removeEventListener('keydown', handleToggleKeybind)
    }
  }, [handleToggleKeybind])

  useEffect(() => {
    // When default options change (something rendering <Command /> re-renders)
    // and it's safe to do so (no existing input, not inside nested), update the options
    if (inputRef.current && !inputRef.current.value && !nestedRef.current) {
      dispatch({ type: 'refresh', options: defaultOptions })
    }
  }, [defaultOptions])

  useEffect(() => {
    // Setup keybinds for list entries
    const keybinds = []

    flatten(defaultOptions).forEach(opt => {
      if (!opt.keybind || !opt.callback || opt.collection) return

      if (keybinds[opt.keybind]) {
        throw new Error(`Duplicate keybind for ${opt.keybind}`)
      }

      keybinds.push(new KeyHandler(opt.keybind, opt.callback))
    })

    const keybind = e => {
      // Only handle keybinds if there is nothing else selected on the page
      // i.e. shouldn't trigger keybind when typing into <input />
      // TODO: make this explicitly ignore input, textarea, etc...?
      if (document.activeElement === document.body) {
        keybinds.forEach(handler => handler.handle(e))
      }
    }

    window.addEventListener('keydown', keybind)
    return () => window.removeEventListener('keydown', keybind)
  }, [defaultOptions])

  return (
    <>
      <div
        role="button"
        tabIndex={-1}
        onClick={() => toggle()}
        className={styles.trigger}
      >
        {children}
      </div>
      <Transition in={open} unmountOnExit timeout={200} onExited={reset}>
        {state => (
          <Portal>
            <div
              className={cn(styles.screen, {
                [styles.exit]: state === 'exiting'
              })}
              onClick={() => toggle(false)}
            >
              <div
                className={cn(styles.command, {
                  [styles.exit]: state === 'exiting'
                })}
                onClick={e => e.stopPropagation()}
                onKeyDown={onKeyDown}
                style={{
                  '--height': toPx(height),
                  '--width': toPx(width)
                }}
              >
                {top && <div className={styles.top}>{top}</div>}

                <input
                  type="text"
                  className={cn(styles.input, {
                    [styles.empty]: items.length === 0
                  })}
                  autoFocus
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="off"
                  placeholder={placeholder}
                  onChange={onChange}
                  ref={inputRef}
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded
                  aria-owns={listID}
                />

                <ul
                  className={cn(styles.list)}
                  style={{
                    maxHeight: max * height,
                    height:
                      items.length !== 0
                        ? items
                            .map(x =>
                              x.collection
                                ? 25 + x.items.length * height
                                : x.divider
                                ? 1 + height * 1.2
                                : height
                            )
                            .reduce((acc, cur) => acc + cur)
                        : 0
                  }}
                  role="listbox"
                  id={listID}
                  ref={listRef}
                >
                  {renderItems({
                    items,
                    active,
                    setActive: i => {
                      dispatch({ type: 'setActive', active: i })
                      inputRef?.current?.focus()
                    },
                    updateOptions: opts => handleNested(opts)
                  })}
                </ul>

                {/* Specifically for screen readers */}
                <div aria-live="polite" role="status" className={styles.hidden}>
                  {flatItems.length} results available...
                </div>
              </div>
            </div>
          </Portal>
        )}
      </Transition>
    </>
  )
}

export default Command
