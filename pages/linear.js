import {
  Command,
  CommandList,
  CommandItem,
  CommandInput
} from '@components/cmd'
import { useCommand } from '@components/cmd/use-command'
import styles from '@styles/linear.module.css'

const Test = () => {
  const commandProps = useCommand({
    open: true
  })

  console.log(commandProps)

  return (
    <Command
      className={styles.command}
      aria-label="Linear Command"
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
