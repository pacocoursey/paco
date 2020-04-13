import Page from '@components/page'
import useKey from '@lib/use-key'
import { useState } from 'react'
import Button from '@components/button'

const Test = () => {
  const [show, setShow] = useState(false)
  useKey('a', () => console.log('a'))
  useKey('b', () => console.log('b'))
  useKey('c d', () => console.log('c'))

  return (
    <Page>
      <Button onClick={() => setShow(s => !s)}>Show the component</Button>
      {show && <X />}
    </Page>
  )
}

const X = () => {
  useKey('d', () => console.log('d'))
  return 'show'
}

export default Test
