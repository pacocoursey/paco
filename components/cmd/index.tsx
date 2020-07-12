import {
  createContext,
  useContext,
  useRef,
  forwardRef,
  useCallback,
  SetStateAction,
  Dispatch,
  Ref
} from 'react'
import { useId } from '@reach/auto-id'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import {
  createDescendantContext,
  DescendantProvider,
  useDescendant,
  Descendant
} from '@reach/descendants'

export type SetSelected = (selected: number) => void

type CommandContext = {
  listId?: string
  label: string
  selected: number
  setSelected: SetSelected
  search: string
}

type FilterFunction = (props: CommandItemProps, search: string) => boolean

export interface FilterProps {
  filter?: FilterFunction
}

export type CommandDescendant = Descendant & {
  callback: () => void
  value?: string
}

export interface CommandItemProps {
  callback: () => void
}

export interface CommandListProps {
  descendants: Descendant[]
  setDescendants: Dispatch<SetStateAction<Descendant<HTMLElement>[]>>
}

export interface CommandProps {
  'aria-label': 'string'
  open: boolean
  selected: number
  setSelected: SetSelected
  search: string

  className?: string
  overlayClassName?: string
  onDismiss?: () => void
}

export const DescendantContext = createDescendantContext<CommandDescendant>(
  'CommandDescendantContext'
)
const CommandContext = createContext<CommandContext>({
  listId: '',
  label: '',
  selected: -1,
  setSelected: () => {},
  search: ''
})
const useCommandCtx = () => useContext(CommandContext)

export const Command: React.FC<CommandProps> = ({
  children,
  'aria-label': label,
  open,
  selected,
  setSelected,
  search,
  onDismiss,
  className,
  overlayClassName
}) => {
  const listId = useId()

  const context = {
    listId,
    label,
    selected,
    setSelected,
    search
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

export const CommandList: React.FC<CommandListProps> = forwardRef(
  (
    { descendants, setDescendants, children, ...props },
    ref: Ref<HTMLUListElement>
  ) => {
    const { listId } = useCommandCtx()

    return (
      <>
        <ul
          ref={ref}
          role="listbox"
          id={listId}
          data-command-list=""
          data-command-list-empty={descendants.length === 0 ? '' : undefined}
          {...props}
        >
          <DescendantProvider
            // @ts-ignore Ye idk how to fix this, types suck
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
)

const FilterContext = createContext<FilterFunction | null | undefined>(null)
export const useFilter = () => useContext(FilterContext)

export const Filter: React.FC<FilterProps> = ({ filter, children }) => {
  return (
    <FilterContext.Provider value={filter}>{children}</FilterContext.Provider>
  )
}

export const CommandItem: React.FC<CommandItemProps> = (
  props: CommandItemProps
) => {
  const filter = useFilter()
  const { search } = useCommandCtx()

  const shouldRender =
    typeof filter === 'function' ? filter(props, search) : true

  if (shouldRender) {
    return <CommandItemInner {...props} />
  }

  return null
}

export const CommandItemInner: React.FC<CommandItemProps> = ({
  children,
  callback,
  ...props
}) => {
  const ref = useRef<HTMLLIElement>(null)
  const { selected, setSelected } = useCommandCtx()

  const index = useDescendant(
    {
      element: ref.current,
      callback,
      ...props
    },
    DescendantContext
  )

  const isActive = selected === index

  const handleMouse = useCallback(
    throttle(() => {
      requestAnimationFrame(() => {
        setSelected(index)
      })
    }, 50),
    [setSelected, index]
  )

  return (
    <li
      ref={ref}
      onClick={callback}
      // Have to use mouseMove instead of mouseEnter, consider:
      // mouse over item 1, press down arrow, move mouse inside of item 1
      // active item should be item 1 again, not item 2
      onMouseMove={handleMouse}
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

export const CommandInput = forwardRef(
  ({ ...props }, ref: Ref<HTMLInputElement>) => {
    const { listId, label } = useCommandCtx()

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
  }
)

function throttle(fn: any, interval: number) {
  let pending = false
  return (...args: any[]) => {
    if (pending) return
    pending = true
    fn(...args)
    setTimeout(() => (pending = false), interval)
  }
}
