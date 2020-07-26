// Based on https://github.com/shvaikalesh/shim-keyboard-event-key
// but with SSR support

(function() {
  "use strict"

  if (typeof self === 'undefined') return

  const event = KeyboardEvent.prototype
  const desc = Object.getOwnPropertyDescriptor(event, "key")
  if (!desc) return

  const keys = {
    Win: "Meta",
    Scroll: "ScrollLock",
    Spacebar: " ",

    Down: "ArrowDown",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Up: "ArrowUp",

    Del: "Delete",
    Apps: "ContextMenu",
    Esc: "Escape",

    Multiply: "*",
    Add: "+",
    Subtract: "-",
    Decimal: ".",
    Divide: "/",
  }

  Object.defineProperty(event, "key", {
    get: function() {
      const key = desc.get.call(this)

      return keys.hasOwnProperty(key) ? keys[key] : key
    },
  })
})()
