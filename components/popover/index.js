import { useReducer } from 'react'

const Popover = ({ active, children }) => {
  if (!active) return null
  return children
}

export const usePopover = active => {
  return useReducer(reducer, { active })
}

function reducer(state, action) {
  switch (action.type) {
    case 'close': {
      return { ...state, active: false }
    }
    case 'open': {
      return { ...state, active: true }
    }
    default: {
      throw new Error(`Invalid action.type: ${action.type}`)
    }
  }
}

export default Popover
