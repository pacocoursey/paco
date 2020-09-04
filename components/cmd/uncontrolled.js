import { createContext, useContext } from 'react'
import { useCommand, useResetSearch, useResetSelected } from './use-command'

import { Command, CommandInput, CommandList } from '.'
export { CommandItem } from '.'

const ControlledContext = createContext({})
export const useControlled = () => useContext(ControlledContext)

const ControlledCommand = ({ children, open: openProp, ...props }) => {
  const {
    open,
    actions,
    inputRef,
    search,
    listProps,
    commandProps
  } = useCommand(
    {
      open: openProp,
      items: []
    },
    useResetSearch,
    useResetSelected
  )

  return (
    <Command
      {...props}
      {...commandProps}
      open={open}
      search={search}
      setSelected={actions.setSelected}
    >
      <ControlledContext.Provider
        value={{ inputRef, listProps, setSearch: actions.setSearch }}
      >
        {children}
      </ControlledContext.Provider>
    </Command>
  )
}

const ControlledList = props => {
  const { listProps } = useControlled()
  return (
    <CommandList
      {...listProps}
      listRef={listProps.ref}
      {...props}
    ></CommandList>
  )
}

const ControlledInput = props => {
  const { inputRef, setSearch } = useControlled()
  return <CommandInput ref={inputRef} onChange={setSearch} {...props} />
}

export { ControlledInput as CommandInput }
export { ControlledList as CommandList }
export { ControlledCommand as Command }
