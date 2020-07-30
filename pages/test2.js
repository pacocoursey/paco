import {
  useState,
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect
} from 'react'
import { getNames } from 'country-list'
import matchSorter from 'match-sorter'
import { usePrevious } from '@reach/utils'
const names = getNames()

function shuffle(array) {
  array.sort(() => Math.random() - 0.5)
}

const Test = () => {
  const [list, setList] = useState(names.slice(0, 2))
  const [show, setShow] = useState(true)
  const [filter, setFilter] = useState('')
  // const filteredNames = matchSorter(names.slice(0, 10), filter)

  return (
    <>
      <input
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
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
      <button
        onClick={() =>
          setList(list => {
            const l = [...list]
            shuffle(l)
            return l
          })
        }
      >
        Shuffle
      </button>
      {show && (
        <List>
          {list.map(name => {
            return <Item key={name}>{name}</Item>
          })}

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
  const [l, forceUpdate] = useState()

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

  const remove = useCallback(element => {
    if (!element) return

    console.log('remove', element)
    list.current = list.current.filter(el => el !== element)
    forceUpdate({})
  }, [])

  const insert = useCallback(
    element => {
      const insertionIndex = getDOMOrder(element)
      console.log('insert', element, 'at', insertionIndex)

      list.current.splice(insertionIndex, 0, element)
      forceUpdate({})

      return insertionIndex
    },
    [] // eslint-disable-line
  )

  useEffect(() => {
    return () => (list.current = [])
  }, [])

  console.log('list changed', list.current)

  return (
    <ul>
      <button onClick={() => console.log(list.current)}>print</button>
      <ListContext.Provider
        value={{
          list: list.current,
          insert,
          remove,
          effect: l
        }}
      >
        {children}
      </ListContext.Provider>
    </ul>
  )
}

const Item = ({ children, selected, setSelected, ...props }) => {
  const ref = useRef()
  const index = useIndex(ref.current)
  const active = selected === index

  return (
    <li
      ref={ref}
      {...props}
      style={{ color: active ? 'red' : undefined }}
      data-value={children}
    >
      Item {children} ({index})
    </li>
  )
}

const useIndex = el => {
  const [, forceUpdate] = useState()
  const { insert, remove, list } = useList()
  // const myElement = useRef()

  const previousList = usePrevious(list)
  const someChanged = list.some((el, i) => el !== previousList?.[i])

  useEffect(() => {
    if (!el) {
      forceUpdate({})
    } else {
      insert(el)
    }

    return () => remove(el)
  }, [el, someChanged])

  const index = list.findIndex(e => {
    return e === el
  })

  console.log('render', el, index)

  return index
}
