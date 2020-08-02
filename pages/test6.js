import { useState, useEffect, createContext, useContext } from 'react'
import { getNames } from 'country-list'
import { useDescendant, createDescendants, useDescendants } from '@lib/desc3'
import matchSorter from 'match-sorter'
const names = getNames()

function shuffle(array) {
  array.sort(() => Math.random() - 0.5)
}

const Test = () => {
  const [list, setList] = useState(names.slice(0, 2))
  const [show, setShow] = useState(true)
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(0)
  const filteredNames = matchSorter(names.slice(0, 5), filter)

  useEffect(() => {
    setSelected(0)
  }, [filter])

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
            shuffle(l)
            return l
          })
        }
      >
        Shuffle
      </button>
      {show && (
        <List selected={selected} setSelected={setSelected}>
          {/* {list.map(name => {
            return <Item key={name}>{name}</Item>
          })} */}

          {filteredNames.map(name => {
            return (
              <Item key={name} callback={() => console.log(name)}>
                {name}
              </Item>
            )
          })}
        </List>
      )}
    </>
  )
}

export default Test

const Descendants = createDescendants()
const ListContext = createContext({})
const useList = () => useContext(ListContext)

const List = ({ selected, setSelected, children }) => {
  const { listRef, ...context } = useDescendants()

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Enter') {
        const l = context.getList()
        if (l[selected]?.callback) {
          l[selected].callback()
        }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [context, selected])

  return (
    <ul ref={listRef}>
      <p>{context.getList().length} items</p>
      <ListContext.Provider value={{ selected, setSelected }}>
        <Descendants.Provider value={context}>{children}</Descendants.Provider>
      </ListContext.Provider>
    </ul>
  )
}

const Item = ({ children, callback, ...props }) => {
  const { selected, setSelected } = useList()
  const { index, itemRef: ref } = useDescendant(Descendants, { callback })
  const active = selected === index

  return (
    <li
      ref={ref}
      {...props}
      style={{ color: active ? 'red' : undefined }}
      data-value={children}
      onClick={callback}
      onMouseOver={() => setSelected(index)}
    >
      Item {children} ({index})
    </li>
  )
}
