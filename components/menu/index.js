import {
  createDescendantContext,
  useDescendantsInit,
  DescendantProvider,
  useDescendant
} from '@reach/descendants'
import {
  useCallback,
  useEffect,
  useReducer,
  useMemo,
  useRef,
  createContext,
  useContext
} from 'react'
const MenuContext = createContext()
const useMenuContext = () => useContext(MenuContext)

const DescendantContext = createDescendantContext('MenuDescendantContext')

// HOOK

const reducer = (state, action) => {
  switch (action.type) {
    case 'open': {
      return { ...state, open: true }
    }
    case 'close': {
      return { ...state, open: false }
    }
    case 'setActive': {
      return { ...state, active: action.index }
    }
    case 'updateInput': {
      return { ...state, search: action.search }
    }
    case 'setDescendants': {
      return { ...state, descendants: action.descendants }
    }
    default: {
      throw new Error('Invalid action type')
    }
  }
}

export const useMenu = () => {
  const [descendants, setDescendants] = useDescendantsInit()
  const [state, dispatch] = useReducer(reducer, {
    open: true,
    active: 0,
    search: ''
  })

  const actions = useMemo(() => {
    return {
      open: dispatch({ type: 'open' }),
      close: dispatch({ type: 'close' }),
      setActive(newIndex) {
        dispatch({ type: 'setActive', index: newIndex })
      },
      updateInput(e) {
        dispatch({ type: 'updateInput', search: e.target.value })
      }
    }
  }, [])

  useEffect(() => {
    actions.setActive(0)
  }, [state.search, actions])

  return [
    { ...state, descendants },
    { ...actions, setDescendants }
  ]
}

// COMPONENTS

export const Menu = ({ state, actions, children }) => {
  return (
    <DescendantProvider
      context={DescendantContext}
      items={state.descendants}
      set={actions.setDescendants}
    >
      <MenuContext.Provider value={[state, actions]}>
        {children}
        Active index: {state.active}
      </MenuContext.Provider>
    </DescendantProvider>
  )
}

export const MenuInput = () => {
  const [state, actions] = useMenuContext()

  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'ArrowDown') {
        actions.setActive(state.active + 1)
      }
    },
    [actions, state]
  )

  return (
    <input
      type="text"
      onChange={actions.updateInput}
      value={state.search}
      onKeyDown={handleKeyDown}
    />
  )
}

export const MenuItem = ({ value, onClick, children }) => {
  const [state, actions] = useMenuContext()
  const ref = useRef(null)

  const index = useDescendant(
{
      element: ref
    },
    DescendantContext
  )

  const select = () => {
    requestAnimationFrame(() => {
      if (index !== state.active) {
        actions.setActive(index)
      }
    })
  }

  return (
    <div
      aria-selected={index === state.active}
      ref={ref}
      onClick={() => {
        select()
        onClick?.()
      }}
      onMouseMove={select}
      style={{ color: index === state.active ? 'red' : undefined }}
    >
      {children}
    </div>
  )
}

export const MenuItemKeybind = ({ children, command, shift, alt, ctrl }) => {
  return (
    <kbd>
      {command && '⌘'}
      {shift && '⇧'}
      {alt && '⌥'}
      {ctrl && '⌃'}
      {children}
    </kbd>
  )
}
