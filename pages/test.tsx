import { useState } from 'react'

import Menu from '@components/menu'
import Item from '@components/menu/item'

const Test = () => {
  const [text, setText] = useState('')
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <Menu search={text}>
        <Item value="one" onClick={() => setChecked(c => !c)}>
          <input type="checkbox" checked={checked} readOnly />
          one
        </Item>
        <Item value="two">two</Item>
        <Item value="three">three</Item>
        {/* <Item value="four">four</Item> */}
      </Menu>
    </div>
  )
}

export default Test
