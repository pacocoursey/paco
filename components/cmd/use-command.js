import { useEffect, useReducer, useRef, useMemo } from 'react'
import { useDescendantsInit } from '@reach/descendants'

const inputs = ['select', 'button', 'textarea']

function reducer(state, action) {
  switch (action.type) {
    case 'pop': {
      if (state.items.length > 1) {
        return { ...state, items: state.items.slice(0, -1) }
      }

      return state
    }
    case 'toggle': {
      return { ...state, open: !state.open }
    }
    case 'close': {
      return { ...state, open: false }
    }
    case 'open': {
      return { ...state, open: true }
    }
    case 'setSelected': {
      if (state.selected === action.selected) {
        return state
      }

      return { ...state, selected: action.selected }
    }
    case 'setSearch': {
      return { ...state, search: action.value }
    }
    case 'setItems': {
      return { ...state, items: action.items }
    }
    default:
      throw new Error(`Invalid action.type: ${action.type}`)
  }
}

export const useCommand = (defaults, ...hooks) => {
  const [descendants, setDescendants] = useDescendantsInit()
  const inputRef = useRef()

  let [state, dispatch] = useReducer(reducer, {
    search: '',
    selected: 0,
    open: false,
    items: [],
    ...defaults
  })
  const { search, selected, open, items } = state

  useEffect(() => {
    function handleKey(e) {
      switch (e.key) {
        case 'ArrowDown': {
          // Don't move text cursor
          e.preventDefault()

          if (selected < descendants.length - 1) {
            dispatch({ type: 'setSelected', selected: selected + 1 })
          }
          break
        }
        case 'ArrowUp': {
          // Don't move text cursor
          e.preventDefault()

          if (selected > 0) {
            dispatch({ type: 'setSelected', selected: selected - 1 })
          }
          break
        }
        case 'Enter': {
          const cb = descendants[selected]?.callback

          if (!cb) {
            return
          }

          if (document.activeElement) {
            // Ignore [Enter] when button, select, textarea, or contentEditable is focused
            if (
              inputs.indexOf(document.activeElement.tagName.toLowerCase()) !==
                -1 ||
              document.activeElement.contentEditable === 'true'
            ) {
              return
            }

            // Ignore [Enter] on inputs that aren't a CommandInput
            if (!document.activeElement.hasAttribute('data-command-input')) {
              return
            }
          }

          cb()
          break
        }
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selected, descendants])

  const actions = useMemo(() => {
    return {
      setSelected: selected => dispatch({ type: 'setSelected', selected }),
      setSearch: e => dispatch({ type: 'setSearch', value: e.target.value }),
      setItems: items => dispatch({ type: 'setItems', items }),
      close: () => dispatch({ type: 'close' }),
      open: () => dispatch({ type: 'open' })
    }
  }, [])

  hooks.forEach(hook => {
    hook({
      dispatch,
      state,
      inputRef,
      defaults,
      descendants,
      setDescendants
    })
  })

  return {
    descendants,
    setDescendants,
    inputRef,
    items,
    search,
    selected,
    open,
    actions
  }
}

// Helper hooks

export const useResetSelected = ({ dispatch, state }) => {
  useEffect(() => {
    // When search changes or item set changes
    dispatch({ type: 'setSelected', selected: 0 })
  }, [state.search, dispatch, state.items])
}

export const useResetSearch = ({ dispatch, state, inputRef }) => {
  useEffect(() => {
    dispatch({ type: 'setSearch', value: '' })
    inputRef?.current?.focus()
  }, [state.items, dispatch, inputRef])
}
