import { useEffect } from 'react'
import KeyHandler from './handler'
import { Keybinds } from './types'

const keybindsList = new Set<string>()
const globalKeybinds = new Set<KeyHandler>()
let listener: true | null = null

const globalCallback = (e: KeyboardEvent) => {
  // Iterate a static array, otherwise Set contents can change during iteration
  const handlers = Array.from(globalKeybinds)
  handlers.forEach(handler => {
    handler.handle(e)
  })
}

export function useKey(keybinds: Keybinds): void {
  useEffect(() => {
    const handlers: KeyHandler[] = []
    const allKeybinds: string[] = []

    Object.entries(keybinds).forEach(([key, callback]) => {
      // Handle multiple keybinds mapping to one callback
      // i.e. "Meta+k, Control+k" should not allow duplicates for either
      key
        .split(',')
        .map(k => k.trim())
        .forEach(k => {
          if (keybindsList.has(k)) {
            throw new Error(`Keybind "${k}" already in use.`)
          } else {
            keybindsList.add(k)
            allKeybinds.push(k)
          }
        })

      const handler = new KeyHandler(key, callback)
      handlers.push(handler)
      globalKeybinds.add(handler)
    })

    if (!listener) {
      window.addEventListener('keydown', globalCallback)
      listener = true
    }

    return () => {
      handlers.forEach(handler => {
        globalKeybinds.delete(handler)
      })

      allKeybinds.forEach(k => {
        keybindsList.delete(k)
      })

      if (globalKeybinds.size === 0 && listener) {
        window.removeEventListener('keydown', globalCallback)
        listener = null
      }
    }
  }, [keybinds])
}
