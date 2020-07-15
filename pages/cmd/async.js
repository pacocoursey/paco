import { useState, useEffect, useRef } from 'react'
import {
  Command,
  CommandItem,
  CommandInput,
  CommandList
} from '@components/cmd/uncontrolled'
import cn from 'classnames'
import styles from '@styles/inverse.module.css'

const Basic = () => {
  const [input, setInput] = useState()
  const searchTimer = useRef(null)
  const [data, setData] = useState(<CommandItem>Loading...</CommandItem>)

  useEffect(() => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current)
    }

    setData(<CommandItem>Loading...</CommandItem>)

    searchTimer.current = setTimeout(() => {
      return new Promise(resolve => {
        setData(
          <>
            <CommandItem>Async return!</CommandItem>
            <CommandItem>Async return!</CommandItem>
            <CommandItem>Async return!</CommandItem>
            <CommandItem>Async return!</CommandItem>
            <CommandItem>Async return!</CommandItem>
          </>
        )
        resolve('Async data!')
      })
    }, 2000)
  }, [input])

  return (
    <Command
      aria-label="Basic Command"
      open={true}
      className={cn(styles.command, styles.show)}
    >
      <CommandInput
        placeholder="Hello there..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <CommandList>{data}</CommandList>
    </Command>
  )
}

export default Basic
