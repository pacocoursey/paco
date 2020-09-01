import { useState, useLayoutEffect, createContext, useContext } from 'react'
import {
  useDescendants,
  useDescendant,
  createDescendants,
  useGroup
} from '@lib/descendants'
import matchSorter from 'match-sorter'

const Descs = createDescendants()

const useListFilter = (map, filter) => {
  if (!map.current?.size) {
    return null
  }

  // Use memo? have to watch for map changes somehow
  const filterList = matchSorter(Array.from(map.current), filter, {
    keys: [
      item => {
        const [, props] = item
        return props?.value || false
      }
    ]
  })

  return filterList
}

const GroupPage = () => {
  const [filter, setFilter] = useState('')
  const [addedItems, setAddedItems] = useState([])

  const hookProps = useDescendants()
  const filterList = useListFilter(hookProps.map, filter)

  // console.log('full page render', hookProps.map.current, filterList)

  return (
    <>
      <button
        onClick={() => {
          setAddedItems(items => [
            ...items,
            'item-' +
              Math.random()
                .toString(32)
                .substring(2, 5)
          ])
        }}
      >
        Add Item
      </button>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <List
        hookProps={hookProps}
        listRef={hookProps.ref}
        filterList={filterList}
      >
        {/* With groups */}
        <Group name="First">
          <Item>one</Item>
          <Item>two</Item>
        </Group>

        <Item>three</Item>

        <Group name="Secondary">
          <Item>four</Item>
          <Item>orange</Item>
        </Group>

        {/* Without groups */}
        {/* <Item>zero</Item>
        <Item>one</Item>
        <Item>two</Item>
        <Item>three</Item>
        <Item>four</Item>
        <Item>orange</Item> */}

        {/* {addedItems.map(item => {
          return <Item key={`added-item-${item}`}>{item}</Item>
        })} */}
      </List>

      {/* <button
        onClick={() =>
          console.log(
            JSON.stringify(Array.from(hookProps.map.current.keys()), null, 2)
          )
        }
      >
        print map
      </button>

      <pre>
        list:
        {JSON.stringify(
          hookProps.list.current.map(l => l._internalId),
          null,
          2
        )}
      </pre>

      <pre>
        added items:
        {JSON.stringify(addedItems, null, 2)}
      </pre>

      <pre>
        map:
        {JSON.stringify(Array.from(hookProps.map.current.keys()), null, 2)}
      </pre> */}
    </>
  )
}

const ListContext = createContext({})
const useList = () => useContext(ListContext)

const List = ({ children, listRef, filterList, hookProps }) => {
  useLayoutEffect(() => {
    // We cannot rely on filterList.element because the DOM node could be outdated
    // but it would be an optimization: only loop over a pre-calculated array once
    // compared to selectAll → sort → forEach (n*3?)

    const groupList = new Map()

    // Use an up to date DOM list
    Array.from(listRef.current.querySelectorAll('[data-descendant]'))
      .sort((a, b) => {
        return a.getAttribute('data-order') - b.getAttribute('data-order')
      })
      .forEach(item => {
        if (item.parentElement) {
          // Re-insert into parent (does nothing if only child)
          // console.log('re-ordering', item, 'inside of', item.parentElement)
          item.parentElement.appendChild(item)

          const topEl = item.closest('[data-list] > *')

          if (!topEl || topEl === item || topEl === listRef.current) {
            // Item is already at the top level, no point
            return
          }

          // Skip if we already re-inserted this top level element
          if (groupList.has(topEl)) {
            // console.log('not moving', topEl, 'because of duplicates', item)
            return
          }

          listRef.current.appendChild(topEl)
          groupList.set(topEl, true)
        } else {
          console.log(item, 'has no parent')
        }
      })
  })

  return (
    <ul ref={listRef} data-list="">
      <ListContext.Provider value={{ list: filterList }}>
        <Descs.Provider value={hookProps}>{children}</Descs.Provider>
      </ListContext.Provider>
    </ul>
  )
}

const Group = ({ children, name }) => {
  const { list } = useList()
  const { ref, hide } = useGroup(list)

  return (
    <li style={{ listStyleType: 'none' }}>
      {!hide && <p>{name}</p>}
      <ul style={{ padding: 0 }} ref={ref}>
        {children}
      </ul>
    </li>
  )
}

const Item = ({ children }) => {
  const { list } = useList()
  const value = children
  const { map } = useContext(Descs)
  const { ref, index, id } = useDescendant(Descs, { value })

  const hasUpdatedMap = map.current.has(id)

  // -2 means list wasn't ready yet, so always show
  // -1 means this item was filtered out

  // const order = -3
  const order =
    list && hasUpdatedMap
      ? list.findIndex(([itemId]) => {
          return itemId === id
        })
      : -2

  if (order === -1) {
    return null
  }

  return (
    <li ref={ref} data-order={order}>
      {children} ({index}) [{order}]
    </li>
  )
}

export default GroupPage
