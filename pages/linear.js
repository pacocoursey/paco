import {
  Command,
  CommandList,
  CommandItem,
  CommandInput,
  useCommand
} from 'colist'

const Test = () => {
  const commandProps = useCommand({
    open: true
  })

  return (
    <Command
      aria-label="Command menu"
      {...commandProps}
    >
      <CommandInput />
      <CommandList>
        <CommandItem value="No Priority">No Priority</CommandItem>
        <CommandItem value="Urgent">Urgent</CommandItem>
        <CommandItem value="High">High</CommandItem>
        <CommandItem value="Medium">Medium</CommandItem>
        <CommandItem value="Low">Low</CommandItem>
      </CommandList>
    </Command>
  )
}

export default Test
