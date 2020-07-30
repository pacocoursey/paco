import React from 'react'
import {
  Filter,
  Command,
  CommandInput,
  CommandItem,
  CommandList
} from '@components/cmd'
import { useCommand, useResetSelected } from '@components/cmd/use-command'
import matchSorter from 'match-sorter'
import cn from 'classnames'
import { FixedSizeList as List } from 'react-window'

import styles from '@styles/inverse.module.css'

const x = Array(50).fill(0)

// const textFilter = ({ value }, search) => {
//   // return value.toLowerCase().startsWith(search.toLowerCase())
//   return !!matchSorter([value], search).length
// }

const Test = () => {
  const {
    open,
    actions,
    inputRef,
    search,
    listProps,
    selected,
    // descendants,
    commandProps
  } = useCommand(
    {
      open: true
    },
    useResetSelected
  )

  return (
    <Command
      {...commandProps}
      open={open}
      aria-label="Navigation Menu"
      className={cn(styles.command, styles.show)}
      overlayClassName={cn(styles.screen, styles.show)}
      onDismiss={actions.close}
    >
      <div className={styles.top}>
        <CommandInput
          ref={inputRef}
          value={search}
          onChange={actions.setSearch}
          placeholder="Search..."
        />
        {selected}
      </div>

      <div className={styles.container}>
        <CommandList {...listProps}>
          <List height={300} itemCount={x.length} itemSize={60} width="100%">
            {Item}
            {/* <Filter filter={textFilter}> */}
            {/* {x.map((_, i) => {
              return (
                <CommandItem value={`list-${i}`} key={`list-${i}`}>
                  list-{i}
                </CommandItem>
              )
            })} */}
          </List>
          {/* </Filter> */}
        </CommandList>
      </div>
    </Command>
  )
}

const Item = ({ index, style }) => {
  return <CommandItem style={style}>Item {index}</CommandItem>
}

export default Test
