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
import { useId } from '@reach/auto-id'

import toPx from './to-px'
import styles from './command.module.css'

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
  return (
    <li
      className={cn(styles.item, { [styles.active]: active })}
      onClick={callback}
      onMouseMove={onMouseMove}
      role="option"
      tabIndex={-1}
      data-option-index={index}
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

    const { active, setActive, inputRef, callback, x, counts } = rest
    const index = counts.slice(0, base).reduce((acc, cur) => acc + cur, 0) + i

    // Contains submenu items
    if (item.items) {
      return (
        <Item
          {...item}
          index={index}
          key={`command-option-${item.name}-${index}`}
          active={active === index}
          onMouseMove={() => {
            setActive(index)
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
        index={index}
        key={`command-option-${item.name}-${index}`}
        active={active === index}
        onMouseMove={() => {
          setActive(index)
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
  options: defaultOptions,
  max = 10,
  height = 60,
  width = 640,
  placeholder,
  children
}) => {
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const [open, setOpen] = useState(propOpen)
  const [active, setActive] = useState(0)
  const [options, setOptions] = useState(defaultOptions)
  const [items, setItems] = useState(options)
  const listID = useId()

  const flatItems = useMemo(() => flatten(items), [items])

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
      // Reset options on close
      setOptions(defaultOptions)
      setItems(defaultOptions)
      setActive(0)
    }
  }, [open, options, defaultOptions])

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

  const callback = useCallback(c => {
    if (c) {
      c()
    }

    setOpen(false)
  }, [])

  const handleNested = useCallback(i => {
    setOptions(i)
    setItems(i)
    setActive(0)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    flatItems[active].callback()
  }, [flatItems, active])

  const onKeyDown = useCallback(
    e => {
      switch (e.key) {
        case 'ArrowDown': {
          if (listRef.current) {
            if (active < flatItems.length - 1) {
              setActive(active + 1)
              const activeItem = listRef.current.querySelector(
                `li[data-option-index="${active + 1}"]`
              )
              activeItem.scrollIntoView({
                block: 'nearest'
              })
            }
          }
          break
        }
        case 'ArrowUp':
          if (active > 0) {
            setActive(active - 1)
            const activeItem = listRef.current.querySelector(
              `li[data-option-index="${active - 1}"]`
            )
            activeItem.scrollIntoView({
              block: 'nearest'
            })
          }
          break
        case 'Enter':
          // Update items to nested list
          if (flatItems[active].items) {
            handleNested(flatItems[active].items)
          } else {
            callback(flatItems[active].callback)
          }
          break
        default:
          break
      }
    },
    [active, flatItems, callback, handleNested]
  )

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
                  ref={listRef}
                >
                  {renderItems({
                    items,
                    counts: items.map(x => (x.collection ? x.items.length : 1)),
                    active,
                    setActive,
                    inputRef,
                    callback,
                    x: x => handleNested(x)
                  })}
                </ul>

                {/* Specifically for screen readers */}
                <div aria-live="polite" role="status" className={styles.hidden}>
                  {flatItems.length} results available...
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}

export default Command
