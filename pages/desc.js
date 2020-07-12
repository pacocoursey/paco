import {
  createDescendantContext,
  useDescendantsInit,
  DescendantProvider,
  useDescendant
} from '@lib/use-descendants'
import { useRef, useCallback } from 'react'

const DescendantContext = createDescendantContext('List')

function App() {
  const [descendants, setDescendants] = useDescendantsInit()

  return (
    <DescendantProvider
      context={DescendantContext}
      items={descendants}
      set={setDescendants}
    >
      <Item />
    </DescendantProvider>
  )
}

function Item() {
  const ref = useRef()

  useDescendant(
    {
      element: ref.current,
      test: useCallback(() => console.log('asdf'), [])
      // test: 'any'
    },
    DescendantContext
  )

  return <div ref={ref}>hihi</div>
}

export default App
