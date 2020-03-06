import { useState, useCallback, useRef, useEffect } from 'react'
import Portal from '@reach/portal'
import cn from 'classnames'
import matchSorter from 'match-sorter'
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
  keybind
}) => {
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

      <span className={styles.keybind}>
        {Array.isArray(keybind) ? (
          keybind.map(key => {
            return <kbd key={`item-${name}-keybind-${key}`}>{key}</kbd>
          })
        ) : (
          <kbd>{keybind}</kbd>
        )}
      </span>
    </li>
  )
}

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
    setItems(matchSorter(options, e.target.value, { keys: ['name'] }))
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
        case 'ArrowDown':
          if (active < items.length - 1) {
            setActive(active + 1)
          }
          break
        case 'ArrowUp':
          if (active > 0) {
            setActive(active - 1)
          }
          break
        case 'Enter':
          callback(items[active].callback)
          break
        default:
          break
      }
    },
    [active, items]
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
                style={{ '--height': toPx(height), '--width': toPx(width) }}
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
                            .map(x => (x.divider ? 6 : height))
                            .reduce((acc, cur) => acc + cur)
                        : 0
                  }}
                >
                  {items.map((option, i) => {
                    if (option.collection) {
                      return (
                        <>
                          <Label>{option.name}</Label>
                          {option.items.map((suboption, j) => {
                            return (
                              <Item
                                {...suboption}
                                key={`command-suboption-${option.name}-${suboption.name}-${j}`}
                                active={active === i + j}
                                onMouseMove={() => {
                                  setActive(i)
                                  if (inputRef.current) {
                                    inputRef.current.focus()
                                  }
                                }}
                                callback={() => callback(suboption.callback)}
                              />
                            )
                          })}
                        </>
                      )
                    }

                    return (
                      <Item
                        {...option}
                        key={`command-option-${option.name}-${i}`}
                        active={active === i}
                        onMouseMove={() => {
                          setActive(i)
                          if (inputRef.current) {
                            inputRef.current.focus()
                          }
                        }}
                        callback={() => callback(option.callback)}
                      />
                    )
                  })}
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
