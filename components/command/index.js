import { useState, useCallback, useRef, useEffect, Fragment } from 'react'
import Portal from '@reach/portal'
import cn from 'classnames'
import matchSorter from 'match-sorter'
import { useId } from '@reach/auto-id'
import { Transition } from 'react-transition-group'

import toPx from './to-px'
import styles from './command.module.css'

// interface DefaultOption {
//   name: string
//   keybind?: string | string[]
//   icon?: React.ReactNode
//   callback: () => void
// }

// interface DeepOption extends DefaultOption {
//   items: Option[]
// }

// interface CollectionOption {
//   name: string
//   collection: true
//   items: Option[]
// }

// type Option = DefaultOption | CollectionOption | DeepOption

// interface CommandProps {
//   open?: boolean
//   options: Option[]
//   max?: number
//   height?: number
//   width?: number | string
//   placeholder?: string
//   children?: React.ReactNode
// }

// interface ItemProps extends DefaultOption {
//   active?: boolean
//   onMouseMove: () => void
//   index: number
// }

// interface RenderProps {
//   items: Option[]
//   base?: number
//   active: number
//   setActive: (index: number) => void
//   updateOptions: (opts: Option[]) => void
//   counts: number[]
//   callback: (cb: () => void) => void
// }

const Label = ({ children }) => {
  return <div className={styles.divider}>{children}</div>
}

const Item = ({
  active,
  icon,
  name,
  callback,
  onMouseMove,
  keybind,
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
          {Array.isArray(keybind) ? (
            keybind.map(key => {
              return <kbd key={`item-${name}-keybind-${key}`}>{key}</kbd>
            })
          ) : (
            <kbd>{keybind}</kbd>
          )}
        </span>
      )}
    </li>
  )
}

const renderItems = ({ items, base = 0, ...rest }) => {
  return items.map((item, i) => {
    if (item.collection) {
      return (
        <Fragment key={`collection-${item.name}-${i}`}>
          <Label>{item.name}</Label>
          {/* Recurse */}
          {renderItems({
            items: item.items,
            base: i,
            ...rest
          })}
        </Fragment>
      )
    }

    const { active, setActive, updateOptions, counts } = rest
    const index = counts.slice(0, base).reduce((acc, cur) => acc + cur, 0) + i

    let cb = item.callback

    // Contains submenu items
    if (item.items) {
      cb = () => updateOptions(item.items)
    }

    // Exit case
    return (
      <Item
        {...item}
        index={index}
        key={`command-option-${item.name}-${index}`}
        active={active === index}
        onMouseMove={() => setActive(index)}
        callback={cb}
      />
    )
  })
}

const flatten = i =>
  i
    .map(item => {
      if (item.collection) return flatten(item.items)
      return item
    })
    .flat()

const Command = ({
  open: propOpen,
  options: defaultOptions,
  max = 10,
  height = 60,
  width = 640,
  placeholder,
  children
}) => {
  const inputRef = useRef(null)
  const nestedRef = useRef(null)
  const [open, setOpen] = useState(propOpen)
  const [active, setActive] = useState(0)
  const [options, setOptions] = useState(defaultOptions)
  const [items, setItems] = useState(options)
  const listID = useId()
  const flatItems = flatten(items)

  // Callbacks
  const toggle = useCallback(
    value => {
      if (value === false || open === true) {
        setOpen(false)
        return
      }

      if (value === true) {
        // Open
        return setOpen(true)
      }

      // Toggle
      setOpen(!open)
    },
    [open]
  )

  const handleKeybinds = useCallback(
    e => {
      if (e.metaKey && e.key === 'k') {
        toggle()
      } else if (e.key === 'Escape') {
        toggle(false)
      }
    },
    [toggle]
  )

  const onChange = useCallback(
    e => {
      if (!e.target.value) {
        setItems(options)
        setActive(0)
      }

      const x = matchSorter(options, e.target.value, {
        keys: [
          item => !item.collection && item.name,
          item => (item.collection ? item.items.map(i => i.name) : undefined)
        ]
      })

      const y = x.map(i => {
        if (i.collection) {
          return {
            ...i,
            items: matchSorter(i.items, e.target.value, { keys: ['name'] })
          }
        }

        return i
      })

      setItems(y)
      setActive(0)
    },
    [options]
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
      setOptions(i)
      setItems(i)
      setActive(0)
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
            setActive(active + 1)
          }
          break
        }
        case 'ArrowUp':
          e.preventDefault()

          if (active > 0) {
            setActive(active - 1)
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

            // if (props.closeOnCallback) {
            //  toggle(false)
            // }
          }
          break
        default:
          break
      }
    },
    [active, flatItems, handleNested, defaultOptions]
  )

  const reset = useCallback(() => {
    setOptions(defaultOptions)
    setItems(defaultOptions)
    setActive(0)
    nestedRef.current = false
  }, [defaultOptions])

  // Effects
  useEffect(() => {
    // Register keybinds
    window.addEventListener('keydown', handleKeybinds)

    return () => {
      window.removeEventListener('keydown', handleKeybinds)
    }
  }, [handleKeybinds])

  useEffect(() => {
    if (inputRef.current && !inputRef.current.value && !nestedRef.current) {
      setOptions(defaultOptions)
      setItems(defaultOptions)
    }
  }, [defaultOptions, items, options])

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
            <div className={styles.screen} onClick={() => toggle(false)}>
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
                                : height
                            )
                            .reduce((acc, cur) => acc + cur)
                        : 0
                  }}
                  role="listbox"
                  id={listID}
                >
                  {renderItems({
                    items,
                    counts: items.map(x => (x.collection ? x.items.length : 1)),
                    active,
                    setActive: i => {
                      setActive(i)
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
