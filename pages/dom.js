// const blogItems = [
//   {
//     value: 'Post A'
//   },
//   {
//     value: 'Post B'
//   }
// ]

// const renderItems = (state, actions) => {
//   const { items, search } = state
//   const activeItems = items[items.length - 1]
//   const filterItems = matchSorter(activeItems, search, { keys: ['value'] })

//   return filterItems.map(item => {
//     const Comp = item.Render

//     if (!Comp) {
//       return <CommandItem>{item.value}</CommandItem>
//     }
//     return <Comp state={state} actions={actions} />
//   })
// }

// const defaultItems = [
//   {
//     value: 'Frames',
//     Render: () => {
//       return (
//         <CommandItem key="Frames">
//           icon here
//           <h5>Frames</h5>
//           <span>For artboards and lay...</span>↵
//         </CommandItem>
//       )
//     }
//   },
//   {
//     value: 'Search blog...',
//     Render: ({ actions, state }) => {
//       const goBlog = useCallback(() => {
//         actions.setItems([...state.items, blogItems])
//       }, [actions, state.items])

//       return (
//         <CommandItem value="Search Blog" key="Search Blog" callback={goBlog}>
//           Search blog
//         </CommandItem>
//       )
//     }
//   },
//   {
//     value: 'Interactions',
//     Render: () => {
//       return (
//         <CommandItem key="Interactions">
//           icon here
//           <h5>Interactions</h5>
//           <span>Add links, modals, overlays</span>↵
//         </CommandItem>
//       )
//     }
//   },
//   {
//     value: 'Check',
//     Render: () => {
//       const [checked, setChecked] = useState(false)

//       const x = useCallback(() => {
//         setChecked(c => !c)
//       }, [])

//       return (
//         <CommandItem key="Interactions" callback={x}>
//           <input
//             type="checkbox"
//             checked={checked}
//             onChange={() => setChecked(!checked)}
//           />
//           Check me
//         </CommandItem>
//       )
//     }
//   }
// ]

import React, { useState, useCallback, useEffect } from 'react'
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList
} from '@components/cmd'
import {
  useCommand,
  useResetSelected,
  useResetSearch
} from '@components/cmd/use-command'
import matchSorter from 'match-sorter'
import cn from 'classnames'

import Page from '@components/page'
import styles from '@styles/inverse.module.css'
import Button from '@components/button'
import useDelayedRender from 'use-delayed-render'

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

const DefaultItems = ({ state, actions }) => {
  const [checked, setChecked] = useState(false)

  const x = useCallback(() => {
    setChecked(c => !c)
  }, [])

  const goBlog = useCallback(() => {
    actions.setItems([...state.items, BlogItems])
  }, [state.items, actions])

  const goPricing = useCallback(() => {
    actions.setItems([...state.items, PriceItems])
  }, [state.items, actions])

  const items = [
    <CommandItem value="Toggle Theme" key="Toggle Theme">
      Toggle Theme
    </CommandItem>,
    <CommandItem value="Search Blog" key="Search Blog" callback={goBlog}>
      Search blog
    </CommandItem>,
    <CommandItem value="Calculate" key="Calculate" callback={goPricing}>
      Calculate Tax
    </CommandItem>,
    <CommandItem value="Check me" key="Check me" callback={x}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      Check me
    </CommandItem>
  ]

  return items
}

const Test = () => {
  const {
    selected,
    open,
    actions,
    inputRef,
    search,
    items,
    descendants,
    setDescendants
  } = useCommand(
    {
      open: true,
      items: [DefaultItems]
    },
    useResetSelected,
    useResetSearch
  )

  const { mounted, rendered } = useDelayedRender(open, {
    enterDelay: -1,
    exitDelay: 200
  })

  // Can't do this inside of useCommand because it relies on useDelayedRender
  useEffect(() => {
    if (!mounted) {
      actions.setItems([DefaultItems])
    }
  }, [mounted, actions])

  const Items = items[items.length - 1]

  return (
    <Page title="Command">
      <h1>Command Testing</h1>
      <button onClick={actions.open}>Toggle</button>

      <Command
        open={mounted}
        aria-label="Navigation Menu"
        selected={selected}
        setSelected={actions.setSelected}
        className={cn(styles.command, {
          [styles.show]: rendered
        })}
        overlayClassName={cn(styles.screen, {
          [styles.show]: rendered
        })}
        onDismiss={actions.close}
      >
        <div className={styles.top}>
          <CommandInput
            ref={inputRef}
            value={search}
            onChange={actions.setSearch}
            placeholder="Search..."
          />
          {items.length > 1 && (
            <Button onClick={() => actions.setItems(items.slice(0, -1))}>
              ←
            </Button>
          )}

          <Button onClick={actions.close}>close</Button>
        </div>

        <CommandList descendants={descendants} setDescendants={setDescendants}>
          <Items state={{ items, search, open }} actions={actions} />
        </CommandList>
      </Command>
    </Page>
  )
}

export default Test
