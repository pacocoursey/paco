import React, { useState, useCallback, useEffect } from 'react'
import {
  Filter,
  Command,
  CommandInput,
  CommandItem,
  CommandList
} from '@components/cmd'
import {
  useCommand,
  useResetSelected,
  useResetSearch
} from '@components/cmd/use-command'
import matchSorter from 'match-sorter'
import cn from 'classnames'

import Page from '@components/page'
import styles from '@styles/inverse.module.css'
import Button from '@components/button'
import useDelayedRender from 'use-delayed-render'

const textFilter = ({ value }, search) => {
  return !!matchSorter([value], search).length
}

const DefaultItems = ({ state, actions }) => {
  const [checked, setChecked] = useState(false)

  const x = useCallback(() => {
    setChecked(c => !c)
  }, [])

  const items = [
    <Filter filter={textFilter}>
      <CommandItem value="Toggle Theme" key="Toggle Theme">
        Toggle Theme
      </CommandItem>
      <CommandItem value="Search Blog" key="Search Blog">
        Search blog...
      </CommandItem>
      <CommandItem value="Calculate" key="Calculate">
        Calculate Tax...
      </CommandItem>
      <CommandItem value="Check me" key="Check me" callback={x}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        Check me
      </CommandItem>
    </Filter>
  ]

  return items
}

const details = {
  'Toggle Theme': 'some contents here yayayayayay',
  'Search Blog': 'Post A, Post B'
}

const Test = () => {
  const {
    open,
    actions,
    inputRef,
    search,
    items,
    selectedValue,
    listProps,
    commandProps
  } = useCommand(
    {
      open: true,
      items: DefaultItems
    },
    useResetSelected,
    useResetSearch
  )

  const { mounted, rendered } = useDelayedRender(open, {
    enterDelay: -1,
    exitDelay: 200
  })

  // Can't do this inside of useCommand because it relies on useDelayedRender
  useEffect(() => {
    if (!mounted) {
      actions.setItems(DefaultItems)
    }
  }, [mounted, actions])

  const Items = items

  return (
    <Page title="Command">
      <h1>Command Testing</h1>
      <button onClick={actions.open}>Toggle</button>

      <Command
        {...commandProps}
        open={mounted}
        aria-label="Navigation Menu"
        className={cn(styles.command, {
          [styles.show]: rendered
        })}
        overlayClassName={cn(styles.screen, {
          [styles.show]: rendered
        })}
      >
        <div className={styles.top}>
          <CommandInput
            ref={inputRef}
            value={search}
            onChange={actions.setSearch}
            placeholder="Search..."
          />

          <Button onClick={actions.close}>close</Button>
        </div>

        <CommandList {...listProps}>
          <Items state={{ items, search, open }} actions={actions} />
        </CommandList>

        {details[selectedValue]}
      </Command>
    </Page>
  )
}

export default Test
