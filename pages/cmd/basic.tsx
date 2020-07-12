import {
  Command,
  CommandItem,
  CommandInput,
  CommandList
} from '@components/cmd/uncontrolled'

const Basic = () => {
  return (
    <Command aria-label="Basic Command">
      <CommandInput placeholder="Hello there..." />

      <CommandList>
        <CommandItem callback={() => {}} value="hello">
          Hello
        </CommandItem>
        <CommandItem callback={() => {}} value="hello two">
          Hello two
        </CommandItem>
      </CommandList>
    </Command>
  )
}

export default Basic
