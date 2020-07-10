import {
  useEffect,
  createContext,
  useContext,
  useRef,
  forwardRef,
  useCallback
} from 'react'
import { useId } from '@reach/auto-id'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import {
  createDescendantContext,
  useDescendantsInit,
  DescendantProvider,
  useDescendant
} from '@reach/descendants'

const DescendantContext = createDescendantContext('List')
const CommandContext = createContext({})
const useCommand = () => useContext(CommandContext)

export function Command({
  children,
  'aria-label': label,
  open,
  onDismiss,
  active,
  setActive,
  className,
  overlayClassName
}) {
  const listId = useId()

  const context = {
    listId,
    label,
    active,
    setActive
  }

  return (
    <CommandContext.Provider value={context}>
      <DialogOverlay
        isOpen={open}
        className={overlayClassName}
        data-command-overlay=""
        onDismiss={onDismiss}
      >
        <DialogContent className={className} data-command="" aria-label={label}>
          {children}
        </DialogContent>
      </DialogOverlay>
    </CommandContext.Provider>
  )
}

const inputs = ['select', 'button', 'textarea']

export function CommandList({ children }) {
  const { listId, active, setActive } = useCommand()
  const [descendants, setDescendants] = useDescendantsInit()

  useEffect(() => {
    function handleKey(e) {
      switch (e.key) {
        case 'ArrowDown': {
          if (active < descendants.length - 1) {
            setActive(active + 1)
          }
          break
        }
        case 'ArrowUp': {
          if (active > 0) {
            setActive(active - 1)
          }
          break
        }
        case 'Enter': {
          const cb = descendants[active]?.callback

          if (!cb) {
            return
          }

          if (document.activeElement) {
            // Ignore [Enter] when button, select, textarea, or contentEditable is focused
            if (
              inputs.indexOf(document.activeElement.tagName.toLowerCase()) !==
                -1 ||
              document.activeElement.contentEditable === 'true'
            ) {
              return
            }

            // Ignore [Enter] on inputs that aren't a CommandInput
            if (!document.activeElement.hasAttribute('data-command-input')) {
              return
            }
          }

          cb()
          break
        }
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [active, descendants, setActive, children])

  return (
    <>
      <ul role="listbox" id={listId} data-command-list="">
        <DescendantProvider
          context={DescendantContext}
          items={descendants}
          set={setDescendants}
        >
          {children}
        </DescendantProvider>
      </ul>

      {descendants.length > 0 && (
        <div aria-live="polite" role="status" data-command-list-results="">
          {descendants.length} results available.
        </div>
      )}
    </>
  )
}

export function CommandItem({ children, callback }) {
  const ref = useRef()
  const { active, setActive } = useCommand()

  const index = useDescendant(
    {
      element: ref.current,
      callback
    },
    DescendantContext
  )

  const isActive = active === index

  const handleMouse = useCallback(
    throttle(() => {
      requestAnimationFrame(() => {
        setActive(index)
      })
    }, 50),
    [setActive, index]
  )

  return (
    <li
      ref={ref}
      onClick={callback}
      // Have to use mouseMove instead of mouseEnter, consider:
      // mouse over item 1, press down arrow, move mouse inside of item 1
      // active item should be item 1 again, not item 2
      onMouseMove={handleMouse}
      style={{
        color: isActive ? '#fff' : '#888'
      }}
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
  const { listId, label } = useCommand()

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

function throttle(fn, interval) {
  let pending = false
  return (...args) => {
    if (pending) return
    pending = true
    fn(...args)
    setTimeout(() => (pending = false), interval)
  }
}
