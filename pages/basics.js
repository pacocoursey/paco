import {
  useEffect,
  useRef,
  useCallback,
  useState,
  useLayoutEffect
} from 'react'

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

const X = () => {
  const [l, forceUpdate] = useState()
  const [, forceUpdate2] = useState()
  const skip = useRef(false)

  console.log('re-render')

  useEffect(() => {
    console.log('skip to true')
    skip.current = true
  }, [l])

  useEffect(() => {
    if (skip.current === false) {
      console.log('effect')
    }

    return () => {
      if (skip.current === false) {
        console.log('effect cleanup')
        skip.current = false
      }
    }
  })

  return (
    <div>
      <button onClick={() => forceUpdate({})}>re-render</button>
      <br />
      <button onClick={() => forceUpdate2({})}>
        re-render but this one is ok
      </button>
    </div>
  )
}

export default X
