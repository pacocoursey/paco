// import { useState } from 'react'
import matchSorter from 'match-sorter'

import {
  MenuInput,
  Menu,
  MenuItem,
  MenuItemKeybind,
  useMenu
} from '@components/menu'

const items = ['one', 'two', 'three', 'four']

const Test = () => {
  const [state, actions] = useMenu()

  return (
    <div>
      <Menu state={state} actions={actions}>
        <MenuInput />
        {matchSorter(items, state.search).map((item, i) => {
          return (
            <MenuItem value={item} key={`menu-item-${item}-${i}`}>
              {item}
              {item === 'three' && <MenuItemKeybind command>d</MenuItemKeybind>}
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}

export default Test
