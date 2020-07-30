import {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback
} from 'react'
import { getNames } from 'country-list'
import matchSorter from 'match-sorter'
const names = getNames()

const Test = () => {
  const [list, setList] = useState(Array(0).fill(0))
  const [show, setShow] = useState(true)
  // const [selected, setSelected] = useState(0)
  // const [filter, setFilter] = useState('')

  // const filteredNames = matchSorter(names, filter)

  return (
    <>
      {/* <input
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      /> */}
      <button onClick={() => setList([...list, 1, 1])}>insert item</button>
      <br />
      <button
        onClick={() =>
          setList(l => {
            const x = [...l]
            x.pop()
            return x
          })
        }
      >
        remove item
      </button>
      <br />
      <button onClick={() => setShow(s => !s)}>toggle entire list</button>
      {show && (
        <List>
          <Item>one</Item>
          {list.map((_, i) => {
            return <Item key={`list-item-${i}`}>List item {i}</Item>
          })}
          <Item>two</Item>

          {/* {filteredNames.map(name => {
            return (
              <Item key={name} selected={selected} setSelected={setSelected}>
                {name}
              </Item>
            )
          })} */}
        </List>
      )}
    </>
  )
}

export default Test

const ListContext = createContext({})
const useList = () => useContext(ListContext)

const List = ({ children }) => {
  const list = useRef([])
  const changedIndex = useRef([])
  const changeType = useRef()
  const [l, forceUpdate] = useState()
  const changedElement = useRef([])

  const getDOMOrder = useCallback(element => {
    const index = list.current.findIndex(item => {
      if (!item || !element) return false

      return Boolean(
        item.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING
      )
    })

    if (index === -1) {
      return list.current.length
    }

    return index
  }, [])

  const remove = useCallback(index => {
    changedIndex.current.push(index)
    changeType.current = 'remove'
    list.current.splice(index, 1)
    forceUpdate({})
  }, [])

  const insert = useCallback(
    element => {
      const insertionIndex = getDOMOrder(element)
      console.log('insert', element, 'at', insertionIndex)
      changedIndex.current.push(insertionIndex)
      changedElement.current.push(element)
      changeType.current = 'insert'

      list.current.splice(insertionIndex, 0, element)
      forceUpdate({})

      return insertionIndex
    },
    [] // eslint-disable-line
  )

  console.log('list changed', list)

  useEffect(() => {
    changedIndex.current = []
  }, [l])

  return (
    <ul>
      <ListContext.Provider
        value={{
          list: list.current,
          insert,
          remove,
          changedIndex,
          changedElement,
          changeType,
          effect: l
        }}
      >
        {children}
      </ListContext.Provider>
    </ul>
  )
}

const Item = ({ children, selected, setSelected, ...props }) => {
  const { index, ref } = useIndex()
  const active = selected === index

  return (
    <li
      ref={ref}
      {...props}
      style={{ color: active ? 'red' : undefined }}
      // onMouseOver={() => setSelected(index)}
    >
      Item {children} ({index})
    </li>
  )
}

const useIndex = () => {
  const {
    changedIndex,
    changeType,
    changedElement,
    insert,
    remove,
    effect
  } = useList()
  const [, forceUpdate] = useState()
  const myIndex = useRef(-1)
  const firstRender = useRef(true)
  const myElement = useRef()

  const element = useCallback(node => {
    if (node) {
      // Mount
      myElement.current = node
      myIndex.current = insert(node)
    } else {
      // Unmount
      remove(myIndex.current)
    }
  }, []) // eslint-disable-line

  // Reacting to changes in the parent list
  useEffect(() => {
    if (firstRender.current === true) {
      firstRender.current = false
    } else {
      if (changedElement.current.includes(myElement.current)) {
        // My index was affected by the change
        console.log(
          'important re-render',
          myIndex.current,
          changedIndex.current
        )
        if (changedIndex.current.includes(myIndex.current)) {
          if (changeType.current === 'insert') {
            myIndex.current += changedIndex.current.length
          } else {
            myIndex.current--
          }
          forceUpdate({})
        }

        // if (myIndex.current >= changedIndex.current) {
        //   if (changeType.current === 'insert') {
        //     myIndex.current++
        //   } else {
        //     myIndex.current--
        //   }
        //   forceUpdate({})
        // }
      }
    }
  }, [effect]) // eslint-disable-line

  return { index: myIndex.current, ref: element }
}
