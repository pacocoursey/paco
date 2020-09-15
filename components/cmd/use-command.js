import React, {
  useEffect,
  useReducer,
  useRef,
  useMemo,
  useCallback
} from 'react'
import { useDescendants } from '@components/use-descendants'
import matchSorter from 'match-sorter'

const inputs = ['select', 'button', 'textarea']

function reducer(state, action) {
  switch (action.type) {
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

const filter = (map, filter) => {
  const values = Object.values(map.current)

  if (!values.length) {
    return null
  }

  const filterList = matchSorter(values, filter, {
    keys: [
      props => {
        return props?.value || null
      }
    ]
  })

  return filterList
}

export const useCommand = (defaults, ...hooks) => {
  const inputRef = useRef()
  const { ref: listRef, ...listProps } = useDescendants()

  let [state, dispatch] = useReducer(reducer, {
    search: '',
    selected: 0,
    items: [],
    ordering: true,
    ...defaults
  })
  const { search, selected, items, ordering } = state

  const filterList = filter(listProps.map, search)

  console.log(listProps.list.current)

  useKeydown({
    dispatch,
    selected,
    descendants: listProps.list.current,
    rotate: defaults?.rotate || false,
    element: defaults?.element
  })

  const actions = useMemo(() => {
    return {
      setSelected: selected => dispatch({ type: 'setSelected', selected }),
      setSearch: e => dispatch({ type: 'setSearch', value: e.target.value }),
      setItems: items => dispatch({ type: 'setItems', items })
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
    inputRef,
    items,
    search,
    selected,
    setSelected: actions.setSelected,
    filterList,
    ordering,
    listRef,
    actions,
    ...listProps
  }
}

// Helper hooks

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
