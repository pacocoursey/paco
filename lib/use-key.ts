import { useEffect } from 'react'
import KeyHandler, { Callback } from '@components/command/key-handler'

const globalKeybinds = new Set<KeyHandler>()
let listener: true | null = null

const globalCallback = (e: KeyboardEvent) => {
  for (const handler of globalKeybinds) {
    handler.handle(e)
  }
}

function useKey(keybind: string, callback: Callback): void {
  useEffect(() => {
    let handlers: KeyHandler | KeyHandler[]

    if (Array.isArray(keybind)) {
      handlers = keybind.map(h => new KeyHandler(h.keybind, h.callback))
      handlers.forEach(h => {
        globalKeybinds.add(h)
      })
    } else {
      handlers = new KeyHandler(keybind, callback)
      globalKeybinds.add(handlers)
    }

    if (!listener) {
      window.addEventListener('keydown', globalCallback)
      listener = true
    }

    return () => {
      if (Array.isArray(handlers)) {
        handlers.forEach(h => {
          globalKeybinds.delete(h)
        })
      } else {
        globalKeybinds.delete(handlers)
      }
      if (globalKeybinds.size === 0 && listener) {
        window.removeEventListener('keydown', globalCallback)
        listener = null
      }
    }
  }, [keybind, callback])
}

export default useKey
