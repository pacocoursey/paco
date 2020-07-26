// Adapted from https://github.com/reecelucas/react-use-hotkeys
import { Modifier, Callback } from './types'

const modiferKeyMap = {
  control: 'ctrlKey',
  shift: 'shiftKey',
  alt: 'altKey',
  meta: 'metaKey',
}

// Helpers
const getActiveModifierKeys = (event: KeyboardEvent) => {
  const modifiers = []

  if (event.ctrlKey) {
    modifiers.push('ctrlKey')
  }

  if (event.shiftKey) {
    modifiers.push('shiftKey')
  }

  if (event.altKey) {
    modifiers.push('altKey')
  }

  if (event.metaKey) {
    modifiers.push('metaKey')
  }

  return modifiers
}
const mapModifierKeys = (keys: Modifier[]) => keys.map((k) => modiferKeyMap[k])
const modifierKeyPressed = (event: KeyboardEvent) =>
  event.altKey || event.ctrlKey || event.shiftKey || event.metaKey
const isSameSet = (a: any[], b: any[]) =>
  a.length === b.length && a.every((item) => b.includes(item))
const arraysAreEqual = (a: any[], b: any[]) =>
  a.length === b.length && a.every((item, i) => item === b[i])

const KEY_SEQUENCE_TIMEOUT = 500
let insideSequence = false

export const getHotkeysArray = (hotkeys: string): string[] | string[][] => {
  let hkeys = hotkeys.toLowerCase()

  // We're dealing with a single key
  if (hkeys.length === 1) {
    return [hkeys]
  }

  // More than one keybind
  if (hkeys.includes(',')) {
    const result = hkeys.split(',').map((key) => getHotkeysArray(key.trim()))
    // @ts-ignore
    return result
  }

  if (hkeys.includes('+')) {
    // We're dealing with a modifier-key combination
    return hkeys.replace(/\s+/g, '').split('+')
  }

  /**
   * We're dealing with a key sequence, so split on spaces.
   * If the whitespace character is within quotation marks (" " or ' ')
   * it signifies a space key and not a delimeter.
   */
  return [...(hkeys.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g) || [])].map((key) =>
    key.replace(/("|').*?("|')/, ' ')
  )
}

class KeyHandler {
  keys: string[] | string[][]
  callback: Callback
  keySequence: string[]
  sequenceTimer: NodeJS.Timeout | null

  constructor(keys: string, callback: Callback) {
    this.keys = getHotkeysArray(keys)
    this.callback = callback
    this.keySequence = []
    this.sequenceTimer = null
  }

  setCallback(c: Callback) {
    this.callback = c
  }

  clearSequenceTimer = () => {
    if (this.sequenceTimer) clearTimeout(this.sequenceTimer)
  }

  resetKeySequence = () => {
    insideSequence = false
    this.clearSequenceTimer()
    this.keySequence = []
  }

  handleKeySequence = (key: string[], event: KeyboardEvent) => {
    this.clearSequenceTimer()

    // Pressed key does not match the pattern
    if (key[this.keySequence.length] !== event.key.toLowerCase()) {
      return
    }

    this.sequenceTimer = setTimeout(() => {
      this.resetKeySequence()
    }, KEY_SEQUENCE_TIMEOUT)

    insideSequence = true
    this.keySequence.push(event.key.toLowerCase())

    if (arraysAreEqual(this.keySequence, key)) {
      this.resetKeySequence()
      this.execute(event)
    }
  }

  handleModifierCombo = (key: string[], event: KeyboardEvent) => {
    const actionKey = key[key.length - 1]
    const modKeys = mapModifierKeys(key.slice(0, -1) as Modifier[])
    const activeModKeys = getActiveModifierKeys(event)
    const allModKeysPressed = isSameSet(modKeys, activeModKeys)

    if (allModKeysPressed && event.key.toLowerCase() === actionKey) {
      this.execute(event)
    }
  }

  handleKeybind = (key: string[], event: KeyboardEvent) => {
    // Handle modifier key combos
    if (modifierKeyPressed(event)) {
      return this.handleModifierCombo(key, event)
    }

    // Handle key sequences
    if (this.keys.length > 1) {
      return this.handleKeySequence(key, event)
    }

    // Handle the basic case: a single hotkey
    if (!insideSequence && event.key.toLowerCase() === key[0]) {
      this.execute(event)
    }
  }

  execute(e: KeyboardEvent) {
    e.preventDefault()
    this.callback(e)
  }

  handle = (event: KeyboardEvent) => {
    if (Array.isArray(this.keys[0])) {
      ;(this.keys as string[][]).map((key) => this.handleKeybind(key, event))
    } else {
      return this.handleKeybind(this.keys as string[], event)
    }
  }
}

export default KeyHandler
