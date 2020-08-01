import { useState, useRef } from 'react'
import { getNames } from 'country-list'
import {
  useDescendant,
  createDescendants,
  useDescendants
} from '@lib/descendants'
const names = getNames()

function shuffle(array) {
  array.sort(() => Math.random() - 0.5)
}

const Test = () => {
  const [list, setList] = useState(names.slice(0, 2))
  const [show, setShow] = useState(true)
  // const [filter, setFilter] = useState('')
  // const [selected, setSelected] = useState(0)
  // const filteredNames = matchSorter(names.slice(0, 80), filter)

  // useEffect(() => {
  //   setSelected(0)
  // }, [filter])

  return (
    <>
      {/* <input
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      /> */}
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

const Descendants = createDescendants()

const List = ({ children }) => {
  const context = useDescendants()

  return (
    <ul>
      <Descendants.Provider value={context}>{children}</Descendants.Provider>
    </ul>
  )
}

const Item = ({ children, selected, setSelected, ...props }) => {
  const ref = useRef()
  const index = useDescendant(ref.current, Descendants)
  const active = selected === index

  return (
    <li
      ref={ref}
      {...props}
      style={{ color: active ? 'red' : undefined }}
      data-value={children}
      // onMouseOver={() => setSelected(index)}
    >
      Item {children} ({index})
    </li>
  )
}
