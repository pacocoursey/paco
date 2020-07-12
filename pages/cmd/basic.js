import {
  Command,
  CommandItem,
  CommandInput,
  CommandList
} from '@components/cmd/uncontrolled'

const Basic = () => {
  return (
    <Command aria-label="Basic Command" open={true}>
      <CommandInput placeholder="Hello there..." />

      <CommandList>
        <CommandItem callback={() => alert('hello')} value="hello">
          Hello
        </CommandItem>
        <CommandItem callback={() => alert('hihihi')} value="hello two">
          Hello two
        </CommandItem>
      </CommandList>
    </Command>
  )
}

export default Basic
