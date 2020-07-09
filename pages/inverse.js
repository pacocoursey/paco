import {
  useState,
  useMemo,
  Children,
  cloneElement,
  useEffect,
  createContext,
  useContext
} from 'react'
import matchSorter from 'match-sorter'
import { useId } from '@reach/auto-id'
import { Dialog } from '@reach/dialog'

import Page from '@components/page'

const blogItems = [
  <CommandItem value="Post A">Post A</CommandItem>,
  <CommandItem value="Post B">Post B</CommandItem>
]

const priceItems = value => [
  <CommandItem>{value * 0.88} Euros</CommandItem>,
  <CommandItem>{value * 0.8} Pound sterling</CommandItem>,
  <CommandItem>{value * 22.36} Mexican Pesos</CommandItem>,
  <CommandItem>{value * 16.06} Egyptian Pound</CommandItem>
]

const defaultItems = (setScreens, search) => [
  <CommandItem value="Toggle Theme" callback={() => alert('Toggle theme')}>
    Toggle Theme
  </CommandItem>,
  <CommandItem
    value="Search Blog"
    callback={() => setScreens(screens => [...screens, blogItems])}
  >
    Search blog
  </CommandItem>,
  <CommandItem
    value="Calculate"
    callback={() => {
      setScreens(screens => [...screens, priceItems(Number(search))])
    }}
  >
    Calculate Tax
  </CommandItem>
]

const Test = () => {
  const [search, setSearch] = useState('')
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(true)
  const [screens, setScreens] = useState(() => [defaultItems(() => {}, search)])

  // const filterItems = useMemo(() => {
  //   // const items = screens[screens.length - 1]

  //   // return matchSorter(items, search, { keys: ['props.value'] })
  // }, [screens, search, mode])

  const filterItems = screens[screens.length - 1]

  useEffect(() => {
    setActive(0)
  }, [search])

  // useEffect(() => {
  //   setSearch('')
  // }, [mode])

  return (
    <Page title="Command">
      <h1>Command Testing</h1>
      <button onClick={() => setOpen(!open)}>Toggle</button>

      <Command aria-label="Navigation Menu" open={open}>
        <CommandInput
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <CommandList active={active} setActive={setActive}>
          {filterItems}
        </CommandList>
      </Command>
    </Page>
  )
}

export default Test

const CommandContext = createContext({})
const useCommand = () => useContext(CommandContext)

function Command({ children, 'aria-label': label, open }) {
  const listId = useId()

  const context = {
    listId,
    label
  }

  return (
    <CommandContext.Provider value={context}>
      <Dialog isOpen={open}>{children}</Dialog>
    </CommandContext.Provider>
  )
}

function CommandList({ children, active, setActive }) {
  const { listId } = useCommand()
  const childCount = Children.count(children)

  useEffect(() => {
    function handleKey(e) {
      switch (e.key) {
        case 'ArrowDown': {
          if (active < childCount - 1) {
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
          const cb = Children.toArray(children)[active].props.callback
          if (cb) {
            cb()
          }
          break
        }
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [active, childCount, setActive, children])

  return (
    <>
      <ul role="listbox" id={listId}>
        {Children.map(children, (child, i) => {
          return cloneElement(child, {
            active: i === active,
            setActive: () => setActive(i)
          })
        })}
      </ul>

      {childCount > 0 && (
        <div aria-live="polite" role="status">
          {childCount} results available.
        </div>
      )}
    </>
  )
}

function CommandItem({ children, active, setActive, callback }) {
  return (
    <li
      onClick={callback}
      onMouseMove={setActive}
      style={{
        color: active ? '#fff' : '#888'
      }}
      // a11y
      tabIndex={-1}
      aria-selected={active || undefined}
      role="option"
    >
      {children}
    </li>
  )
}

function CommandInput({ value, onChange }) {
  const { listId, label } = useCommand()

  return (
    <input
      value={value || undefined}
      onChange={onChange}
      type="text"
      // a11y
      aria-expanded={true}
      aria-autocomplete="list"
      autoComplete="off"
      role="combobox"
      aria-label={label}
      aria-owns={listId}
    />
  )
}
