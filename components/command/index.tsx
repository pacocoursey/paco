import {
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useReducer,
  ChangeEvent
} from 'react'
import useKey, { Keybinds } from 'use-key'
import Portal from '@reach/portal'
import cn from 'classnames'
import matchSorter from 'match-sorter'
import { useId } from '@reach/auto-id'
import { Transition } from 'react-transition-group'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

import toPx from './to-px'
import defaultStyles from './command.module.css'
import renderItems from './item'
import { Items, BaseItem, Props, State, Action } from './types'

const arraysEqual = (a: any[], b: any[]) =>
  JSON.stringify(a) === JSON.stringify(b)

const flatten = (i: Items): BaseItem[] => {
  if (!i || !i.length) return []
  return i
    .map(item => {
      if ('collection' in item) return flatten(item.items)
      return item
    })
    .flat()
}

const reducer = (state: State, action: Action) => {
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
        items: action.items,
        active: 0
      }
    case 'setActive':
      if (state.active === action.active) return state
      return {
        ...state,
        active: action.active
      }
    case 'reset':
      return {
        ...state,
        active: 0,
        items: action.items
      }
    case 'updateInPlace':
      // Lists do not match
      if (action.items.length !== state.items.length) {
        return {
          ...state,
          items: action.items,
          active: 0
        }
      }

      const currentItemNames = flatten(state.items).map(x => x.name)
      const newItemNames = flatten(action.items).map(x => x.name)

      if (arraysEqual(currentItemNames, newItemNames)) {
        return {
          ...state,
          items: action.items
        }
      } else {
        return {
          ...state,
          items: action.items,
          active: 0
        }
      }
    default:
      throw new Error(`Invalid reducer action: ${action}`)
  }
}

const Command: React.FC<Props> = ({
  open: propOpen = false,
  items: propItems,
  max = 10,
  height = 60,
  labelHeight = 25,
  width = 640,
  top,
  placeholder,
  keybind = 'Meta+k, Control+k',
  searchOn,
  onClose,
  styles = {},
  children
}) => {
  const listID = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [state, dispatch] = useReducer(reducer, {
    open: propOpen,
    active: 0,
    items: propItems
  })
  const { open, active, items } = state
  const flatItems = flatten(items)

  // Memo
  const searchableAttributes = useMemo(() => {
    if (!searchOn) return []

    if (!Array.isArray(searchOn)) {
      throw new Error('search prop must be an array.')
    }

    return searchOn.map(attr => {
      // TODO: improve
      return (i: any): any => {
        if (typeof i[attr] !== 'string') return null
        if ('collection' in i) return i[attr]
        return null
      }
    })
  }, [searchOn])

  // Callbacks
  const listRef = useCallback(node => {
    if (node) {
      disableBodyScroll(node)
    }
  }, [])

  const toggle = useCallback(
    (value?: boolean) => {
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

  const onChange = useCallback(
    (e?: ChangeEvent<HTMLInputElement>) => {
      const value = e?.target?.value || inputRef?.current?.value

      if (!value) {
        return dispatch({ type: 'update', items: propItems })
      }

      // TODO: support searching entire collections (likely needs match-sorter fork)
      const topLevelMatches = matchSorter(propItems, value, {
        keys: [
          item => ('collection' in item ? '' : item.name),
          item => ('collection' in item ? item.items.map(i => i.name) : ''),
          ...searchableAttributes
        ]
      })

      // Unfortunately have to run matchSorter twice, nested values are not returned
      // https://github.com/kentcdodds/match-sorter/issues/87
      const allMatches = topLevelMatches.map(i => {
        if ('collection' in i) {
          return {
            ...i,
            items: matchSorter(i.items, value, { keys: ['name'] })
          }
        }

        return i
      })

      dispatch({ type: 'update', items: allMatches })
    },
    [propItems, searchableAttributes]
  )

  const bounce = useCallback(() => {
    if (inputRef.current) {
      // Bounce the UI slightly
      const command = inputRef.current.closest('div')
      if (command) {
        command.style.transform = 'scale(0.99)'
        // Not exactly safe, but should be OK
        setTimeout(() => {
          command.style.transform = ''
        }, 100)
      }
    }
  }, [])

  const clear = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    dispatch({ type: 'reset', items: propItems })
  }, [propItems])

  const handleExit = useCallback(() => {
    clear()
    onClose?.()
  }, [onClose, clear])

  const triggerActiveCallback = useCallback(
    index => {
      if (!flatItems.length) return
      if (!flatItems[index]) return
      if (!flatItems[index].callback) return

      flatItems[index].callback()
      const options = flatItems[index].onCallback || {}
      if (options.close !== false) toggle(false)
      if (options.clear) clear()
      if (options.bounce) bounce()
    },
    [flatItems, toggle, clear, bounce]
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
        case 'Enter':
          triggerActiveCallback(active)
          break
        default:
          break
      }
    },
    [active, triggerActiveCallback, flatItems]
  )

  // Effects
  useEffect(() => {
    dispatch({ type: 'updateInPlace', items: propItems })
    if (inputRef.current && inputRef.current.value) {
      onChange()
    }
  }, [propItems, onChange])

  const keybinds = useMemo(() => {
    const o: Keybinds = {}
    flatItems
      .filter(i => !!i.keybind)
      .forEach(i => {
        const { keybind, callback } = i
        o[keybind as string] = callback
      })
    return o
  }, [flatItems])

  // Register keybind event listeners
  useKey({
    [keybind]: () => toggle()
  })
  useKey({
    Escape: () => toggle(false)
  })
  useKey(keybinds)

  return (
    <>
      <div
        role="button"
        tabIndex={-1}
        onClick={() => toggle()}
        className={defaultStyles.trigger}
      >
        {children}
      </div>

      <Transition in={open} unmountOnExit timeout={200} onExited={handleExit}>
        {state => (
          <Portal>
            <div
              className={cn(
                defaultStyles.screen,
                styles.screen,
                {
                  [defaultStyles.onExiting]: state === 'exiting'
                },
                styles.onExiting
                  ? { [styles.onExiting]: state === 'exiting' }
                  : null
              )}
              onClick={() => toggle(false)}
            >
              <div
                className={cn(
                  defaultStyles.command,
                  styles.command,
                  {
                    [defaultStyles.onExiting]: state === 'exiting',
                    [defaultStyles.noResults]: items.length === 0
                  },
                  styles.onExiting
                    ? { [styles.onExiting]: state === 'exiting' }
                    : null,
                  styles.noResults
                    ? { [styles.noResults]: items.length === 0 }
                    : null
                )}
                onClick={e => e.stopPropagation()}
                onKeyDown={onKeyDown}
                style={{
                  ['--height' as string]: toPx(height),
                  ['--width' as string]: toPx(width)
                }}
              >
                {top && (
                  <div className={cn(defaultStyles.top, styles.top)}>{top}</div>
                )}

                <input
                  type="text"
                  className={cn(defaultStyles.input, styles.input)}
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
                  className={cn(defaultStyles.list, styles.list)}
                  style={{
                    height: Math.min(
                      max * height,
                      items.length !== 0
                        ? items
                            .map(x =>
                              'collection' in x
                                ? labelHeight + x.items.length * height
                                : x.divider
                                ? 1 + height * 1.2
                                : height
                            )
                            .reduce((acc, cur) => acc + cur)
                        : 0
                    )
                  }}
                  role="listbox"
                  id={listID}
                  ref={listRef}
                >
                  {renderItems({
                    items,
                    active,
                    callback: triggerActiveCallback,
                    setActive: i => {
                      dispatch({ type: 'setActive', active: i })
                      inputRef?.current?.focus()
                    },
                    styles
                  })}
                </ul>

                <div
                  aria-live="polite"
                  role="status"
                  className={defaultStyles.hidden}
                >
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
