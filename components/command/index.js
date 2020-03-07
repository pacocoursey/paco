import {
  useState,
  useCallback,
  useRef,
  useEffect,
  Fragment,
  useMemo
} from 'react'
import Portal from '@reach/portal'
import cn from 'classnames'
import matchSorter from 'match-sorter'

import toPx from './to-px'
import styles from './command.module.css'

const Label = ({ children }) => {
  return <div className={styles.divider}>{children}</div>
}

const Item = ({ active, icon, name, callback, onMouseMove, keybind }) => {
  return (
    <li
      className={cn(styles.item, { [styles.active]: active })}
      onClick={callback}
      onMouseMove={onMouseMove}
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

const renderItems = (items, count, ...rest) => {
  return items.map((item, i) => {
    if (item.collection) {
      return (
        <Fragment key={`command-option-${item.name}-${count}-${i}`}>
          <Label>{item.name}</Label>
          {renderItems(item.items, count + i, ...rest)}
        </Fragment>
      )
    }

    const [active, setActive, inputRef, callback, x] = rest

    // Contains submenu items
    if (item.items) {
      return (
        <Item
          {...item}
          key={`command-option-${item.name}-${count}-${i}`}
          active={active === count + i}
          onMouseMove={() => {
            setActive(count + i)
            if (inputRef.current) {
              inputRef.current.focus()
            }
          }}
          callback={() => x(item.items)}
        />
      )
    }

    // Exit case
    return (
      <Item
        {...item}
        key={`command-option-${item.name}-${i}`}
        active={active === count + i}
        onMouseMove={() => {
          setActive(count + i)
          if (inputRef.current) {
            inputRef.current.focus()
          }
        }}
        callback={() => callback(item.callback)}
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
    .flat(2)

// interface DefaultOption {
//   name: string
//   keybind?: string | string[]
//   icon?: React.ReactNode
//   callback: () => void
// }

// interface CollectionOption {
//   name: string
//   collection: true
//   items: Option[]
// }

// type Option = DefaultOption | CollectionOption

// interface CommandProps {
//   open?: boolean
//   options: Option[]
//   max?: number
//   height?: number
//   width?: number | string
//   placeholder?: string
//   children?: React.ReactNode
// }

const Command = ({
  open: propOpen,
  options,
  max = 10,
  height = 60,
  width = 640,
  placeholder,
  children
}) => {
  const inputRef = useRef(null)
  const [open, setOpen] = useState(propOpen)
  const [active, setActive] = useState(0)
  const [items, setItems] = useState(options)

  const flatItems = useMemo(() => flatten(items), [items])

  // console.log(options.filter(x => x.name === 'XX').pop().items.length)

  const handleKeybinds = useCallback(e => {
    if (e.metaKey && e.key === 'k') {
      setOpen(o => !o)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }, [])

  useEffect(() => {
    // Register keybinds
    window.addEventListener('keydown', handleKeybinds)

    return () => {
      window.removeEventListener('keydown', handleKeybinds)
    }
  }, [handleKeybinds])

  useEffect(() => {
    if (!open) {
      // Reset options
      setItems(options)
      setActive(0)
    }
  }, [open])

  const onChange = useCallback(e => {
    if (!e.target.value) {
      setItems(options)
      setActive(0)
    }

    const x = matchSorter(options, e.target.value, {
      keys: [
        item => item.name,
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
  }, [])

  const callback = useCallback(
    c => {
      if (c) {
        c()
      }

      setOpen(false)
    },
    [items, active]
  )

  const onKeyDown = useCallback(
    e => {
      switch (e.key) {
        case 'ArrowDown': {
          if (active < flatItems.length - 1) {
            setActive(active + 1)
          }
          break
        }
        case 'ArrowUp':
          if (active > 0) {
            setActive(active - 1)
          }
          break
        case 'Enter':
          callback(flatItems[active].callback)
          break
        default:
          break
      }
    },
    [active, flatItems]
  )

  // console.log(items)

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        className={styles.trigger}
      >
        {children}
      </div>

      {open && (
        <Portal>
          <div className={styles.screen} onClick={() => setOpen(false)}>
            <div className={styles.wrapper} onClick={e => e.stopPropagation()}>
              <div
                className={cn(styles.command)}
                onKeyDown={onKeyDown}
                style={{
                  '--height': toPx(height),
                  '--width': toPx(width)
                }}
              >
                <input
                  type="name"
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
                >
                  {renderItems(
                    items,
                    0,
                    active,
                    setActive,
                    inputRef,
                    callback,
                    x => {
                      alert(x)
                      setItems(x)
                    }
                  )}
                </ul>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}

export default Command
