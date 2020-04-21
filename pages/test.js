import { useState, useCallback } from 'react'
import { useKey } from 'use-key'
import { Transition } from 'react-transition-group'

const x = 'Meta+k'

let i = 0

const constantCallback = () => console.log('stable')

const Test = () => {
  const [test, setTest] = useState(false)

  const toggle = useCallback(() => {
    console.log('toggle called with current:', test)
    if (test) {
      setTest(false)
    } else {
      setTest(true)
    }
  }, [test])


  useKey('x', toggle)
  useKey('y', constantCallback)
  // i++

  // if (i >= 20) {
  //   return null
  // }

  return (
    <div>
      <button onClick={toggle}>TOGGLE</button>
      {JSON.stringify(test)}
      {/* <InnerComp inProp={test} /> */}
    </div>
  )
}

function InnerComp({ inProp }) {
  console.log('inner comp: ', inProp)
  return (
    <Transition in={inProp} timeout={0}>
      {state => {
        console.log(state)
        return JSON.stringify(state)
      }}
    </Transition>
  )
}

export default Test
