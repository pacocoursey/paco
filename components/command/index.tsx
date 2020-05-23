import {
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useState,
  ChangeEvent,
  createContext
} from 'react'
import Portal from '@reach/portal'
import cn from 'classnames'
import {
  createDescendantContext,
  useDescendants,
  DescendantProvider
} from '@reach/descendants'
import { useId } from '@reach/auto-id'
import matchSorter from 'match-sorter'
import useDelayedRender from 'use-delayed-render'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

import toPx from './to-px'
import KeyHandler from './key-handler'
import defaultStyles from './command.module.css'
import { Props } from './types'
import { Callback } from 'use-key'

type DescendantProps = {
  callback?: Callback
  value: string
}

interface MenuContextInterface {
  active: number
  setActive: (index: number) => void
}

export const DescendantContext = createDescendantContext<
  HTMLElement,
  DescendantProps
>('MenuDescendantContext')
// @ts-ignore
export const MenuContext = createContext<MenuContextInterface>({})

const Command: React.FC<Props> = ({
  open: propOpen = false,
  max = 10,
  height = 60,
  labelHeight = 25,
  width = 640,
  top,
  placeholder,
  keybind = 'Meta+k, Control+k',
  onClose,
  styles = {},
  children
}) => {
  const listID = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(propOpen)
  const [active, setActive] = useState(0)
  const [search, setSearch] = useState('')
  const [descendants, setDescendants] = useDescendants<
    HTMLElement,
    DescendantProps
  >()

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
        setOpen(false)
        return
      }

      // Open
      setOpen(true)
    },
    [open]
  )

  const keybindHandler = useMemo(() => {
    return new KeyHandler(keybind, () => toggle())
  }, [keybind, toggle])

  const handleToggleKeybind = useCallback(
    e => {
      if (e.key === 'Escape') {
        return toggle(false)
      }

      keybindHandler.handle(e)
    },
    [toggle, keybindHandler]
  )

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setActive(0)
  }, [])

  const clear = useCallback(() => {
    setSearch('')
    setActive(0)
  }, [])

  const handleExit = useCallback(() => {
    clear()
    onClose?.()
  }, [onClose, clear])

  // Effects
  useEffect(() => {
    // Register toggle keybind and escape handler
    window.addEventListener('keydown', handleToggleKeybind)

    return () => {
      clearAllBodyScrollLocks()
      window.removeEventListener('keydown', handleToggleKeybind)
    }
  }, [handleToggleKeybind])

  const onKeyDown = useCallback(
    e => {
      switch (e.key) {
        case 'Escape': {
          toggle(false)
          break
        }
        case 'ArrowDown': {
          const isAtEnd = active === descendants.length - 1

          console.log(active, descendants.length)

          if (!isAtEnd) {
            setActive(active + 1)
          }
          break
        }
        case 'ArrowUp': {
          const isAtStart = active === 0

          if (!isAtStart) {
            setActive(active - 1)
          }
          break
        }
        case 'Enter': {
          // @ts-ignore
          descendants[active]?.callback()
          break
        }
        default:
          return
      }
    },
    [toggle, active, descendants]
  )

  const { mounted, rendered } = useDelayedRender(open, {
    onUnmount: handleExit,
    enterDelay: -1,
    exitDelay: 200
  })

  if (!mounted) {
    return null
  }

  console.log(descendants)

  return (
    <Portal>
      <div
        className={cn(defaultStyles.screen, styles.screen, {
          [defaultStyles.show]: rendered
        })}
        onClick={() => toggle(false)}
      >
        <div
          className={cn(defaultStyles.command, styles.command, {
            [defaultStyles.show]: rendered,
            [defaultStyles.noResults]: descendants.length === 0
          })}
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
            // style={{
            //   height: Math.min(
            //     max * height,
            //     descendants.length !== 0
            //       ? descendants
            //           .map(x =>
            //             'collection' in x
            //               ? labelHeight + x.items.length * height
            //               : x.divider
            //               ? 1 + height * 1.2
            //               : height
            //           )
            //           .reduce((acc, cur) => acc + cur)
            //       : 0
            //   )
            // }}
            role="listbox"
            id={listID}
            ref={listRef}
          >
            <DescendantProvider
              context={DescendantContext}
              items={descendants}
              set={setDescendants}
            >
              <MenuContext.Provider
                value={{
                  active,
                  setActive,
                  search
                }}
              >
                {children}
              </MenuContext.Provider>
            </DescendantProvider>
          </ul>
        </div>
      </div>
    </Portal>
  )
}

export default Command
