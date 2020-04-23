import { useState, useCallback, useEffect } from 'react'
import { useKey } from '../use-key'
import { Transition } from 'react-transition-group'

const Test = () => {
  const [test, setTest] = useState(false)
  const [count, setCount] = useState(0)

  const toggle = useCallback(() => {
    if (test) {
      setTest(false)
    } else {
      setTest(true)
    }
  }, [test])

  useKey({
    y: () => toggle()
  })

  useKey({
    z: () => {
      console.log('hey')
    }
  })

  useKey({
    'Meta+k, Control+k': () => console.log('lol')
  })

  useKey({
    'Control+u': () => console.log('asdfasdf')
  })

  useKey({
    a: () => console.log('a'),
    b: () => console.log('b')
  })
  return (
    <div>
      {JSON.stringify(test)}
      <button onClick={() => setCount(count + 1)}>inc</button>
      {/*
      <Transition in={test} timeout={0}>
        {state => {
          // console.log(state)
          return JSON.stringify(state)
        }}
      </Transition> */}
    </div>
  )
}

export default Test
