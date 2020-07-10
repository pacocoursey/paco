import React, {
  useEffect,
  useReducer,
  useState,
  useRef,
  cloneElement
} from 'react'
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList
} from '@components/cmd'
import matchSorter from 'match-sorter'
import cn from 'classnames'

import Page from '@components/page'
import styles from '@styles/inverse.module.css'
import Button from '@components/button'
import useDelayedRender from 'use-delayed-render'
import { GitHub } from '@components/icons'

const Label = ({ children }) => {
  return <li className={styles.label}>{children}</li>
}

const BlogItems = () => [
  <CommandItem value="Post A" key="Post A">
    Post A
  </CommandItem>,
  <CommandItem value="Post B" key="Post B">
    Post B
  </CommandItem>
]

const PriceItems = ({ state: { search } }) => {
  const value = Number(search)

  return [
    <CommandItem key="euros">{value * 0.88} Euros</CommandItem>,
    <CommandItem key="pounds">{value * 0.8} Pound sterling</CommandItem>,
    <CommandItem key="pesos">{value * 22.36} Mexican Pesos</CommandItem>,
    <CommandItem key="egypt">{value * 16.06} Egyptian Pound</CommandItem>
  ]
}

const group = (title, search, items) => {
  const filteredItems = matchSorter(items, search, { keys: ['props.value'] })

  if (filteredItems.length) {
    if (title) {
      return [<Label>{title}</Label>, ...filteredItems]
    }

    return filteredItems
  }

  return []
}

const IconItem = ({ icon, children, ...props }) => {
  return (
    <CommandItem {...props}>
      {icon && <GitHub />}
      {children}
    </CommandItem>
  )
}

const SidebarItem = ({ children, ...props }) => {
  return (
    <ComandItem {...props}>
      <div>{children}</div>
    </ComandItem>
  )
}

const DefaultItems = ({ state, dispatch }) => {
  const [checked, setChecked] = useState(false)

  const items = [
    <IconItem
      value="Toggle Theme"
      key="Toggle Theme"
      callback={() => alert('Toggle theme')}
      icon
    >
      Toggle Theme
    </IconItem>,
    <CommandItem
      value="Search Blog"
      key="Search Blog"
      callback={() =>
        dispatch({ type: 'setItems', items: [...state.items, BlogItems] })
      }
    >
      Search blog
    </CommandItem>,
    <CommandItem
      value="Calculate"
      key="Calculate"
      callback={() =>
        dispatch({ type: 'setItems', items: [...state.items, PriceItems] })
      }
    >
      Calculate Tax
    </CommandItem>,
    ...group('Navigation', state.search, [
      <CommandItem value="Navigation 1">Navigation 1</CommandItem>,
      <CommandItem value="Navigation 2">Navigation 2</CommandItem>,
      <CommandItem value="Navigation 3">Navigation 3</CommandItem>
    ]),
    <CommandItem
      value="Check me"
      key="Check me"
      callback={() => setChecked(!checked)}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      Check me
    </CommandItem>
  ]

  return matchSorter(items, state.search, {
    keys: [
      item => {
        // Always make labels a match
        if (item.type === Label) {
          return state.search
        }

        return item.props.value
      }
    ]
  })
}

function reducer(state, action) {
  switch (action.type) {
    case 'pop': {
      if (state.items.length > 1) {
        return { ...state, items: state.items.slice(0, -1) }
      }

      return state
    }
    case 'toggle': {
      return { ...state, open: !state.open }
    }
    case 'setActive': {
      if (state.active === action.active) {
        return state
      }

      return { ...state, active: action.active }
    }
    case 'setSearch': {
      return { ...state, search: action.value }
    }
    case 'setItems': {
      return { ...state, items: action.items }
    }
    default:
      throw new Error(`Invalid action.type: ${action.type}`)
  }
}

const Test = () => {
  const [state, dispatch] = useReducer(reducer, {
    items: [DefaultItems],
    search: '',
    active: 0,
    open: true
  })
  const { search, active, open, items } = state
  const { mounted, rendered } = useDelayedRender(open, {
    enterDelay: -1,
    exitDelay: 200
  })
  const inputRef = useRef()

  const Items = items[items.length - 1]

  useEffect(() => {
    // When search changes or item set changes
    dispatch({ type: 'setActive', active: 0 })
  }, [state.search, Items])

  useEffect(() => {
    dispatch({ type: 'setSearch', value: '' })
    inputRef.current?.focus()
  }, [Items])

  useEffect(() => {
    if (!open) {
      dispatch({ type: 'setActive', active: 0 })
      dispatch({ type: 'setItems', items: [DefaultItems] })
    }
  }, [open])

  return (
    <Page title="Command">
      <h1>Command Testing</h1>
      <button onClick={() => dispatch({ type: 'toggle' })}>Toggle</button>

      <Command
        open={mounted}
        aria-label="Navigation Menu"
        active={active}
        setActive={active => dispatch({ type: 'setActive', active })}
        className={cn(styles.command, {
          [styles.show]: rendered
        })}
        overlayClassName={cn(styles.screen, {
          [styles.show]: rendered
        })}
        onDismiss={() => dispatch({ type: 'toggle' })}
      >
        <div className={styles.top}>
          <CommandInput
            ref={inputRef}
            value={search}
            onChange={e =>
              dispatch({ type: 'setSearch', value: e.target.value })
            }
            placeholder="Search..."
          />
          {items.length > 1 && (
            <Button onClick={() => dispatch({ type: 'pop' })}>←</Button>
          )}

          <Button onClick={() => dispatch({ type: 'toggle' })}>close</Button>
        </div>

        <CommandList>
          <Items state={state} dispatch={dispatch} />
        </CommandList>
      </Command>
    </Page>
  )
}

export default Test
