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
} from '@components/cmd/descendants'
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
    : []

  return filterList
}

const Order = () => {
  const [filter, setFilter] = useState('')

  const { list, listRef } = useDescendants()
  const filteredList = useListFilter(list, filter)
  console.log(filteredList)

  return (
    <>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <List list={list} listRef={listRef} filterList={filteredList}>
        <Item>one</Item>
        <Item>two</Item>
        <Item>three</Item>
        <Item>four</Item>
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

    // Use an up to date DOM list
    Array.from(listRef.current.querySelectorAll('[data-descendant]'))
      .sort((a, b) => {
        return a.getAttribute('data-order') - b.getAttribute('data-order')
      })
      .forEach(item => {
        listRef.current.appendChild(item)
      })
  })

  return (
    <ul ref={listRef}>
      <ListContext.Provider value={{ list: filterList }}>
        <Descs.Provider value={{ list }}>{children}</Descs.Provider>
      </ListContext.Provider>
    </ul>
  )
}

const Item = ({ children }) => {
  const { list } = useList()
  const value = children
  const { itemRef, index } = useDescendant(Descs, { value })

  // -2 means list wasn't ready yet, so always show
  // -1 means this item was filtered out
  const order = list?.length ? list.findIndex(item => item.value === value) : -2

  if (order === -1) {
    return null
  }

  return (
    <li ref={itemRef} data-order={order}>
      {children} ({index}) [{order}]
    </li>
  )
}

export default Order
