import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react'
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
import { getNames } from 'country-list'
const names = getNames()

import styles from '@styles/inverse.module.css'

// const x = Array(1000).fill(0)

const textFilter = ({ value }, search) => {
  // return value.toLowerCase().startsWith(search.toLowerCase())
  return !!matchSorter([value], search).length
}

const Test = () => {
  const {
    open,
    actions,
    inputRef,
    search,
    listProps,
    selected,
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
          <Filter filter={textFilter}>
            {names.map(name => {
              return (
                <CommandItem value={name} key={name}>
                  {name}
                </CommandItem>
              )
            })}
            {/* {x.map((_, i) => {
              return (
                <CommandItem value={`list-${i}`} key={`list-${i}`}>
                  list-{i}
                </CommandItem>
              )
            })} */}
            {/* <CommandItem value="one">One</CommandItem> */}
            {/* <CommandItem value="two">Two</CommandItem>
            <CommandItem value="three">Three</CommandItem>
            <CommandItem value="four">Four</CommandItem>
            <CommandItem value="five">Five</CommandItem> */}
          </Filter>
        </CommandList>
      </div>
    </Command>
  )
}

export default Test
