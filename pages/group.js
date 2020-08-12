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

const Order = () => {
  const [filter, setFilter] = useState('')

  const { list, listRef } = useDescendants()
  const filteredList = useListFilter(list, filter)

  return (
    <>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <List list={list} listRef={listRef} filterList={filteredList}>
        {/* <Group name="First">
          <Item>one</Item>
          <Item>two</Item>
        </Group> */}

        <Item>one</Item>
        <Item>two</Item>

        <Item>three</Item>

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

    // const groupList = new Map()

    // Use an up to date DOM list
    Array.from(listRef.current.querySelectorAll('[data-descendant]'))
      .sort((a, b) => {
        return a.getAttribute('data-order') - b.getAttribute('data-order')
      })
      .forEach(item => {
        // Re-order inside of parent (potentially group)
        if (item.parentElement) {
          // console.log('insert', item, 'in', item.parentElement)
          // item.parentElement.appendChild(item)

          // if (item.parentElement !== listRef.current) {
          //   const topEl = item.closest('[data-group]')

          //   if (!groupList.has(topEl)) {
          //     groupList.set(topEl, true)
          //     // console.log('inserting', topEl, 'into', topEl.parentElement)
          //     topEl.parentElement.appendChild(topEl)
          //   }
          // }
        } else {
          console.log('For some reason no parent', item)
        }
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

// const Group = ({ children, name }) => {
//   const ref = useRef()
//   const hide = ref.current && !ref.current.children.length

//   return (
//     <li data-group="" style={{ listStyleType: 'none' }}>
//       {!hide && <p>{name}</p>}
//       <ul style={{ padding: 0 }} ref={ref}>
//         {children}
//       </ul>
//     </li>
//   )
// }

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

export default Order
