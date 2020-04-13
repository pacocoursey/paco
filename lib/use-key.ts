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
    const handler = new KeyHandler(keybind, callback)
    globalKeybinds.add(handler)

    if (!listener) {
      window.addEventListener('keydown', globalCallback)
      listener = true
    }

    return () => {
      globalKeybinds.delete(handler)
      if (globalKeybinds.size === 0 && listener) {
        window.removeEventListener('keydown', globalCallback)
        listener = null
      }
    }
  }, [keybind, callback])
}

export default useKey
