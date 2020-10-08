import { useState } from 'react'
import {
  Command,
  CommandList,
  CommandItem,
  CommandInput,
  useCommand,
  CommandGroup
} from 'cmdk'
import randomWords from 'random-words'

const Test = () => {
  const commandProps = useCommand({
    selectedItemClass: 'hihihi'
  })
  const [extras, setExtras] = useState([])

  function load() {
    setExtras(extras => {
      return [...extras, randomWords()]
    })
  }

  return (
    <div>
      <button onClick={load}>Load More</button>
      <Command {...commandProps} label="Linear Command">
        <CommandInput />
        <CommandList>
          <CommandGroup heading={'Hello there'}>
            <CommandItem value="No Priority">No Priority</CommandItem>
            <CommandItem value="Urgent">Urgent</CommandItem>
            <CommandItem value="Hello">Hello</CommandItem>
          </CommandGroup>
          <CommandItem value="High">High</CommandItem>
          <CommandItem value="Medium">Medium</CommandItem>
          <CommandItem value="Low">Low</CommandItem>

          {extras.map(extra => {
            return <CommandItem value={extra}>{extra}</CommandItem>
          })}
        </CommandList>
      </Command>

      <style jsx global>{`
        .hihihi {
          color: red;
        }
      `}</style>
    </div>
  )
}

export default Test
