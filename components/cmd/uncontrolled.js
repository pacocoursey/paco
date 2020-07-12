import { createContext, useContext } from 'react'
import { useCommand } from './use-command'
import matchSorter from 'match-sorter'

import { Command, Filter, CommandInput, CommandList } from '.'
export { CommandItem } from '.'

const ControlledContext = createContext({})
export const useControlled = () => useContext(ControlledContext)

const textFilter = ({ value }, search) => {
  if (!value) return true
  return !!matchSorter([value], search).length
}

const ControlledCommand = ({ children, open: openProp }) => {
  const {
    open,
    actions,
    inputRef,
    search,
    listProps,
    commandProps
  } = useCommand({
    open: openProp,
    items: []
  })

  return (
    <Command
      {...commandProps}
      open={open}
      search={search}
      setSelected={actions.setSelected}
    >
      <ControlledContext.Provider
        value={{ inputRef, listProps, setSearch: actions.setSearch }}
      >
        <Filter filter={textFilter}>{children}</Filter>
      </ControlledContext.Provider>
    </Command>
  )
}

const ControlledList = props => {
  const { listProps } = useControlled()
  return <CommandList {...listProps} {...props}></CommandList>
}

const ControlledInput = props => {
  const { inputRef, setSearch } = useControlled()
  return <CommandInput ref={inputRef} onChange={setSearch} {...props} />
}

export { ControlledInput as CommandInput }
export { ControlledList as CommandList }
export { ControlledCommand as Command }
