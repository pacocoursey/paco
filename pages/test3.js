import {
  useState,
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect
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
      <button onClick={() => setList([...list, `hi-${Math.random()}`])}>
        insert item
      </button>
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
            const a = l[1]
            const b = l[0]
            return [a, b]
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
  }, [])

  const insert = useCallback(
    element => {
      if (!element) {
        return -1
      }

      const insertionIndex = getDOMOrder(element)
      console.log('insert', element, 'at', insertionIndex)
      list.current.splice(insertionIndex, 0, element)
      return insertionIndex
    },
    [] // eslint-disable-line
  )

  useEffect(() => {
    return () => (list.current = [])
  }, [])

  console.log('list render', list.current)

  return (
    <ul>
      <ListContext.Provider
        value={{
          insert,
          remove
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
  const { insert, remove } = useList()

  useEffect(() => {
    if (!el) {
      console.log('forcing update')
      forceUpdate({})
    }
  })

  useEffect(() => {
    return () => {
      remove(el)
    }
  }, [])

  // This is close but it won't work, because the DOM hasn't updated yet
  // (haven't finished render!)
  // So we're comparing against an old DOM position when using comparePosition
  remove(el)
  const index = insert(el)

  return index
}
