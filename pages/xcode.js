import React, { useEffect, useReducer, useState, useRef } from 'react'
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList
} from '@components/cmd'
import matchSorter from 'match-sorter'
import cn from 'classnames'
import { createPortal } from 'react-dom'

import Page from '@components/page'
// import styles from '@styles/inverse.module.css'
import styles from '@styles/xcode.module.css'
import Button from '@components/button'
import useDelayedRender from 'use-delayed-render'
import { GitHub } from '@components/icons'

const Label = ({ children }) => {
  return <li className={styles.label}>{children}</li>
}

// const BlogItems = () => [
//   <CommandItem value="Post A" key="Post A">
//     Post A
//   </CommandItem>,
//   <CommandItem value="Post B" key="Post B">
//     Post B
//   </CommandItem>
// ]

// const PriceItems = ({ state: { search } }) => {
//   const value = Number(search)

//   return [
//     <CommandItem key="euros">{value * 0.88} Euros</CommandItem>,
//     <CommandItem key="pounds">{value * 0.8} Pound sterling</CommandItem>,
//     <CommandItem key="pesos">{value * 22.36} Mexican Pesos</CommandItem>,
//     <CommandItem key="egypt">{value * 16.06} Egyptian Pound</CommandItem>
//   ]
// }

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

// const IconItem = ({ icon, children, ...props }) => {
//   return (
//     <CommandItem {...props}>
//       {icon && <GitHub />}
//       {children}
//     </CommandItem>
//   )
// }

// const SidebarItem = ({ children, icon, ...props }) => {
//   return (
//     <CommandItem {...props}>
//       <div className={styles.sidebar}>
//         <div className={styles.left}>
//           {icon}
//           {props.value}
//         </div>
//         <div className={styles.right}>{children}</div>
//       </div>
//     </CommandItem>
//   )
// }

const details = {
  'Horizontal Stack': (
    <>
      <h4>Horizontal Stack</h4>
      <span>A view that arranges its children in a horizontal line.</span>
      <code>{`struct HStack<Content> where Content : View</Content>`}</code>
      <a>Open in Developer Documentation</a>
    </>
  ),
  'Vertical Stack': (
    <>
      <h4>Vertical Stack</h4>
      <span>A view that arranges its children in a vertical line.</span>
      <code>{`struct VStack<Content> where Content : View</Content>`}</code>
      <a>Open in Developer Documentation</a>
    </>
  )
}

const DefaultItems = ({ state, dispatch }) => {
  const items = [
    ...group('Layout Views', state.search, [
      <CommandItem value="Horizontal Stack">
        <svg width="20" height="20" viewBox="0 0 8 8" fill="currentColor">
          <path d="M0 0h2v8H0V0zM3 0h2v8H3V0zM6 0h2v8H6V0z" />
        </svg>
        Horizontal Stack
      </CommandItem>,
      <CommandItem value="Vertical Stack">
        <svg width="20" height="20" viewBox="0 0 8 8" fill="currentColor">
          <path d="M8 0v2H0V0h8zM8 3v2H0V3h8zM8 6v2H0V6h8z" />
        </svg>
        Vertical Stack
      </CommandItem>
    ])
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
      // if (state.active === action.active) {
      //   return state
      // }

      return { ...state, active: action.active, activeValue: action.value }
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
    active: -1,
    open: true,
    activeValue: null
  })
  const { search, active, open, items, activeValue } = state
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
        selected={active}
        setSelected={(active, { value }) => {
          dispatch({ type: 'setActive', active, value })
        }}
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

        <div className={styles.sidebar}>
          <CommandList>
            <Items state={state} dispatch={dispatch} />
          </CommandList>

          <div className={styles.details}>
            {activeValue && details[activeValue]}
          </div>
        </div>
      </Command>
    </Page>
  )
}

export default Test
