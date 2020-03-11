// Adapted from https://github.com/reecelucas/react-use-hotkeys

const modiferKeyMap = {
  control: 'ctrlKey',
  shift: 'shiftKey',
  alt: 'altKey',
  meta: 'metaKey'
}

// Helpers
const getActiveModifierKeys = event => {
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
const mapModifierKeys = keys => keys.map(k => modiferKeyMap[k])
const modifierKeyPressed = event =>
  event.altKey || event.ctrlKey || event.shiftKey || event.metaKey
const tail = arr => arr[arr.length - 1]
const takeUntilLast = arr => arr.slice(0, -1)
const isSameSet = (arr1, arr2) =>
  arr1.length === arr2.length && arr1.every(item => arr2.includes(item))
const arraysAreEqual = (arr1, arr2) =>
  arr1.length === arr2.length && arr1.every((item, i) => item === arr2[i])

const KEY_SEQUENCE_TIMEOUT = 1000
let insideSequence = false

const getHotkeysArray = hotkeys => {
  const hkeys = hotkeys.toLowerCase()

  if (hkeys.length === 1) {
    // We're dealing with a single key
    return [hkeys]
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
  return [...(hkeys.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g) || [])].map(key =>
    key.replace(/("|').*?("|')/, ' ')
  )
}

class KeyHandler {
  constructor(keys, callback) {
    this.keys = getHotkeysArray(keys)
    this.callback = callback
    this.keySequence = []
    this.sequenceTimer = null
  }

  setCallback(c) {
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

  handleKeySequence = event => {
    this.clearSequenceTimer()

    // Pressed key does not match the pattern
    if (this.keys[this.keySequence.length] !== event.key.toLowerCase()) {
      return
    }

    this.sequenceTimer = setTimeout(() => {
      this.resetKeySequence()
    }, KEY_SEQUENCE_TIMEOUT)

    insideSequence = true
    this.keySequence.push(event.key.toLowerCase())

    if (arraysAreEqual(this.keySequence, this.keys)) {
      this.resetKeySequence()
      event.preventDefault()
      this.callback(event)
    }
  }

  handleModifierCombo = event => {
    const actionKey = tail(this.keys)
    const modKeys = mapModifierKeys(takeUntilLast(this.keys))
    const activeModKeys = getActiveModifierKeys(event)
    const allModKeysPressed = isSameSet(modKeys, activeModKeys)

    if (allModKeysPressed && event.key.toLowerCase() === actionKey) {
      event.preventDefault()
      this.callback(event)
    }
  }

  handle = event => {
    // Handle modifier key combos
    if (modifierKeyPressed(event)) {
      return this.handleModifierCombo(event)
    }

    // Handle key sequences
    if (this.keys.length > 1 && !modifierKeyPressed(event)) {
      return this.handleKeySequence(event)
    }

    // Handle the basic case: a single hotkey
    if (!insideSequence && event.key.toLowerCase() === this.keys[0]) {
      event.preventDefault()
      return this.callback(event)
    }
  }
}

export default KeyHandler
