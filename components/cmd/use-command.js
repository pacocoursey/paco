import { useEffect, useReducer, useRef, useMemo, useCallback } from 'react'
import { useDescendantsInit } from '@reach/descendants'

function reducer(state, action) {
  switch (action.type) {
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
      return state
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

  useKeydown({
    dispatch,
    descendants,
    selected,
    rotate: defaults?.rotate || false,
    element: defaults?.element
  })

  const actions = useMemo(() => {
    return {
      setSelected: selected => dispatch({ type: 'setSelected', selected }),
      setSearch: e => dispatch({ type: 'setSearch', value: e.target.value }),
      setItems: items => dispatch({ type: 'setItems', items }),
      close: () => dispatch({ type: 'close' }),
      open: () => dispatch({ type: 'open' }),
      toggle: () => dispatch({ type: 'toggle' })
    }
  }, [])

  hooks.forEach(hook => {
    hook({
      dispatch,
      state,
      inputRef,
      defaults
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
    actions,
    selectedValue: descendants[selected]?.value,
    listProps: {
      descendants,
      setDescendants
    },
    commandProps: {
      search,
      selected,
      setSelected: actions.setSelected,
      onDismiss: actions.close
    }
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
    // When items change, reset the search field and focus the input
    dispatch({ type: 'setSearch', value: '' })
    inputRef?.current?.focus()
  }, [state.items, dispatch, inputRef])
}

const useKeydown = ({ dispatch, descendants, selected, rotate, element }) => {
  const setLast = useCallback(() => {
    dispatch({ type: 'setSelected', selected: descendants.length - 1 })
  }, [dispatch, descendants])

  const setFirst = useCallback(() => {
    dispatch({ type: 'setSelected', selected: 0 })
  }, [dispatch])

  const setNext = useCallback(() => {
    const atBottom = selected === descendants.length - 1

    if (atBottom) {
      if (rotate) {
        // Loop back to the top
        dispatch({
          type: 'setSelected',
          selected: (selected + 1) % descendants.length
        })
      }
    } else {
      dispatch({ type: 'setSelected', selected: selected + 1 })
    }
  }, [dispatch, selected, rotate, descendants])

  const setPrev = useCallback(() => {
    const atTop = selected === 0

    if (atTop) {
      if (rotate) {
        // Loop back to bottom
        setLast()
      }
    } else {
      dispatch({ type: 'setSelected', selected: selected - 1 })
    }
  }, [dispatch, selected, setLast, rotate])

  useEffect(() => {
    function handleKey(e) {
      switch (e.key) {
        case 'Home': {
          e.preventDefault()
          setFirst()
          break
        }
        case 'End': {
          e.preventDefault()
          setLast()
          break
        }
        case 'ArrowDown': {
          e.preventDefault()
          setNext()
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          setPrev()
          break
        }
        default:
          break
      }
    }

    const el = element || window

    el.addEventListener('keydown', handleKey)
    return () => el.removeEventListener('keydown', handleKey)
  }, [
    selected,
    descendants,
    dispatch,
    setFirst,
    setLast,
    setNext,
    setPrev,
    element
  ])
}
