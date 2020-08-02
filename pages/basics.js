import {
  useEffect,
  useRef,
  useCallback,
  useState,
  useLayoutEffect
} from 'react'
import deepEqual from 'fast-deep-equal'

// const Test = () => {
//   const list = useRef([])

//   const append = () => list.current.push('hi')
//   const remove = () => list.current.pop()
//   return (
//     <div>
//       <button onClick={() => console.log(list.current)}>print</button>
//       <button onClick={append}>append</button>
//       <button onClick={remove}>remove</button>

//       <Item list={list.current} append={append} remove={remove} />
//     </div>
//   )
// }

// const Item = ({ list, append: add, remove: rm }) => {
//   console.log('re-render item', list)
//   const [, forceUpdate] = useState()

//   const append = () => {
//     add()
//     forceUpdate({})
//   }

//   const remove = () => {
//     rm()
//     forceUpdate({})
//   }

//   return (
//     <div>
//       <button onClick={append}>append</button>
//       <button onClick={remove}>remove</button>
//     </div>
//   )
// }

function shuffle(array) {
  array.sort(() => Math.random() - 0.5)
}

const Parent = () => {
  const list = useRef([])
  const [, forceUpdate] = useState()
  const ref = useRef()

  useLayoutEffect(() => {
    const newList = Array.from(ref.current.querySelectorAll('[data-item]'))

    if (!deepEqual(newList, list.current)) {
      console.log('parent effect', list.current)
      list.current = newList
      forceUpdate({})
    }
  })

  const getList = useCallback(() => list.current, [])

  const [items, setItems] = useState(['one', 'two'])

  return (
    <div ref={ref}>
      <button
        onClick={() => setItems(items => [...items, `item-${Math.random()}`])}
      >
        insert
      </button>
      <br />
      <button onClick={() => setItems(items => items.slice(0, -1))}>
        remove
      </button>
      <br />
      <button
        onClick={() => {
          setItems(items => {
            const l = [...items]
            shuffle(l)
            return l
          })
        }}
      >
        shuffle
      </button>
      {items.map(item => {
        return (
          <X getList={getList} key={item}>
            {item}
          </X>
        )
      })}
      <p>{list.current.length} items</p>
    </div>
  )
}

const X = ({ getList, children }) => {
  const ref = useRef()
  const index = useRef(-1)

  useLayoutEffect(() => {
    ref.current.setAttribute('data-item', '')
  })

  console.log('item render', getList())
  if (ref.current) {
    index.current = getList().findIndex(e => e === ref.current)
  }

  return <li ref={ref}>{children} ({index.current})</li>
}

export default Parent
