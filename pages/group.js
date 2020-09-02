import { useState, useLayoutEffect, createContext, useContext } from 'react'
import {
  useDescendants,
  useDescendant,
  createDescendants,
  useGroup
} from '@lib/descendants'
import matchSorter from 'match-sorter'
import { getNames } from 'country-list'
const names = getNames()

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

  const hookProps = useDescendants()
  const filterList = useListFilter(hookProps.map, filter)

  return (
    <>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <List
        hookProps={hookProps}
        listRef={hookProps.ref}
        filterList={filterList}
      >
        {names.map(name => {
          return <Item key={`country-list-${name}`}>{name}</Item>
        })}
      </List>
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
          item.parentElement.appendChild(item)

          const topEl = item.closest('[data-list] > *')

          if (!topEl || topEl === item || topEl === listRef.current) {
            // Item is already at the top level, no point
            return
          }

          // Skip if we already re-inserted this top level element
          if (groupList.has(topEl)) {
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
