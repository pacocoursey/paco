import {
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
  createContext,
  useContext
} from 'react'
import {
  useDescendants,
  useDescendant,
  createDescendants
} from '@lib/descendants'
import matchSorter from 'match-sorter'

const Descs = createDescendants()

const useListFilter = (list, filter) => {
  const completeList = useRef(null)

  useLayoutEffect(() => {
    if (!completeList.current && list.current.length) {
      completeList.current = list.current
    }
  })

  useEffect(() => {
    return () => (completeList.current = null)
  }, [])

  const filterList = completeList.current
    ? matchSorter(completeList.current, filter, {
        keys: ['value']
      })
    : null

  return filterList
}

const GroupPage = () => {
  const [filter, setFilter] = useState('')

  const { list, listRef } = useDescendants()
  const filteredList = useListFilter(list, filter)

  console.log(filteredList)

  return (
    <>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <List list={list} listRef={listRef} filterList={filteredList}>
        {/* <Group name="First">
          <Item>one</Item>
          <Item>two</Item>
        </Group>

        <Item>three</Item> */}

        <div>
          <Item>zero</Item>
        </div>
        <Item fakeProp={2}>one</Item>
        <Item>two</Item>

        <Item>three</Item>

        <Item>four</Item>

        {/* <Group name="Secondary">
          <Item>four</Item>
          <Item>orange</Item>
        </Group> */}

        <Item>orange</Item>
      </List>
    </>
  )
}

const ListContext = createContext({})
const useList = () => useContext(ListContext)

const List = ({ children, list, listRef, filterList }) => {
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
        // If only child, no need (over optimization?)
        // If has siblings, should re-insert inside of parent

        // If has top level element that isn't direct parent, should re-insert but only once

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
        <Descs.Provider value={{ list }}>{children}</Descs.Provider>
      </ListContext.Provider>
    </ul>
  )
}

const Group = ({ children, name }) => {
  const ref = useRef()
  const hide = false
  // const hide = ref.current && !ref.current.children.length

  return (
    <li data-group="" style={{ listStyleType: 'none' }}>
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
  const { itemRef, index } = useDescendant(Descs, { value })

  // -2 means list wasn't ready yet, so always show
  // -1 means this item was filtered out

  // TODO: deal with duplicated values
  const order = list ? list.findIndex(item => item.value === value) : -2

  if (order === -1) {
    return null
  }

  return (
    <div>
      <li ref={itemRef} data-order={order}>
        {children} ({index}) [{order}]
      </li>
    </div>
  )
}

export default GroupPage
