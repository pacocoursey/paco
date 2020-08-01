import {
  DescendantProvider,
  useDescendantsInit,
  useDescendant,
  createDescendantContext
} from '@lib/descendants'
import { useRef } from 'react'

const Test = () => {
  return (
    <List>
      <Item>one</Item>
      <Item>two</Item>
    </List>
  )
}

export default Test

const DescContext = createDescendantContext('TestCtx')

const List = ({ children }) => {
  const [desc, setDesc] = useDescendantsInit()

  return (
    <DescendantProvider set={setDesc} items={desc} context={DescContext}>
      <ul>{children}</ul>
    </DescendantProvider>
  )
}

const Item = ({ children }) => {
  const ref = useRef()
  const index = useDescendant(
    {
      element: ref.current
    },
    DescContext
  )

  return (
    <li ref={ref}>
      {children} ({index})
    </li>
  )
}
