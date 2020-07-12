import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
  Filter,
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  useFilter
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

const BlogItems = () => (
  <Filter filter={textFilter}>
    <CommandItem value="Post A" key="Post A">
      Post A
    </CommandItem>
    <CommandItem value="Post B" key="Post B">
      Post B
    </CommandItem>
  </Filter>
)

const PriceItems = ({ state: { search } }) => {
  const value = Number(search)

  return (
    <>
      <CommandItem key="euros">{value * 0.88} Euros</CommandItem>
      <CommandItem key="pounds">{value * 0.8} Pound sterling</CommandItem>
      <CommandItem key="pesos">{value * 22.36} Mexican Pesos</CommandItem>
      <CommandItem key="egypt">{value * 16.06} Egyptian Pound</CommandItem>
    </>
  )
}

const Label = ({ children, values, search }) => {
  const filter = useFilter()

  const shouldRender =
    typeof filter === 'function' ? filter(values, search) : true

  if (shouldRender) {
    return <li className={styles.label}>{children}</li>
  }

  return null
}

const labelFilter = (values, search) => {
  return !!matchSorter(values, search).length
}

const NavigationGroup = ({ state }) => {
  const values = ['Navigate Home', 'Navigate Projects', 'Navigate Blog']

  return (
    <>
      <Filter filter={labelFilter}>
        <Label values={values} search={state.search}>
          Navigation
        </Label>
      </Filter>
      <CommandItem value="Navigate Home">Navigate Home</CommandItem>
      <CommandItem value="Navigate Projects">Navigate Projects</CommandItem>
      <CommandItem value="Navigate Blog">Navigate Blog</CommandItem>
    </>
  )
}

const DefaultItems = ({ state, actions }) => {
  const [checked, setChecked] = useState(false)

  const x = useCallback(() => {
    setChecked(c => !c)
  }, [])

  const goBlog = useCallback(() => {
    actions.setItems([...state.items, BlogItems])
  }, [state.items, actions])

  const goPricing = useCallback(() => {
    actions.setItems([...state.items, PriceItems])
  }, [state.items, actions])

  return (
    <Filter filter={textFilter}>
      <CommandItem value="Toggle Theme" key="Toggle Theme">
        Toggle Theme
      </CommandItem>
      <CommandItem value="Search Blog" key="Search Blog" callback={goBlog}>
        Search blog...
      </CommandItem>
      <CommandItem value="Calculate" key="Calculate" callback={goPricing}>
        Calculate Tax...
      </CommandItem>
      <NavigationGroup state={state} />
      <CommandItem value="Check me" key="Check me" callback={x}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        Check me
      </CommandItem>
    </Filter>
  )
}

const Cmd = () => {
  const commandRef = useRef()
  const {
    open,
    actions,
    inputRef,
    search,
    items,
    listProps,
    commandProps
  } = useCommand(
    {
      open: true,
      items: [DefaultItems],
      element: commandRef.current
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
      actions.setItems([DefaultItems])
    }
  }, [mounted, actions])

  const Items = items[items.length - 1]

  const listRef = useRef()

  return (
    <Command
      {...commandProps}
      open={mounted}
      aria-label="Navigation Menu"
      className={cn(styles.command, {
        [styles.show]: rendered
      })}
      // overlayClassName={cn(styles.screen, {
      //   [styles.show]: rendered
      // })}
      ref={commandRef}
    >
      <div className={styles.top}>
        <CommandInput
          ref={inputRef}
          value={search}
          onChange={actions.setSearch}
          placeholder="Search..."
        />
        {items.length > 1 && (
          <Button onClick={() => actions.setItems(items.slice(0, -1))}>
            ←
          </Button>
        )}

        <Button onClick={actions.close}>close</Button>
      </div>

      <div
        className={styles.container}
        style={{ height: listRef.current?.offsetHeight }}
      >
        <CommandList {...listProps} ref={listRef}>
          <Items state={{ items, search, open }} actions={actions} />
        </CommandList>
      </div>
    </Command>
  )
}

const Test = () => {
  return (
    <Page title="Command">
      <h1>Command Testing</h1>
      <Cmd />
      <Cmd />
    </Page>
  )
}

export default Test
