// import {
//   createDescendantContext,
//   useDescendants,
//   DescendantProvider
// } from '@reach/descendants'
import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext
} from 'react'

// export const DescendantContext = createDescendantContext(
//   'MenuDescendantContext'
// )
export const MenuContext = createContext(null)
export const TestContext = createContext(null)

// Parent keeps state with all of the active children,
// the children register and de-register themselves at will
// Parent always renders all children, children opt in to render

const Menu = ({ children, search }) => {
  const [descendants, setDescendants] = useState([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    setActive(0)
  }, [search])

  const handle = useCallback(
    e => {
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          setActive(active => {
            const isAtEnd = active === descendants.length - 1

            return isAtEnd ? active : active + 1
          })
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          setActive(active => {
            const isAtStart = active === 0

            return isAtStart ? active : active - 1
          })
          break
        }
        default: {
          return
        }
      }
    },
    [descendants]
  )

  useEffect(() => {
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [handle])

  // console.log(active, descendants)

  return (
    <TestContext.Provider value={{ descendants, set: setDescendants }}>
      <MenuContext.Provider value={{ active, setActive, search }}>
        {children}
      </MenuContext.Provider>
    </TestContext.Provider>
  )
}

export default Menu

export function useTest({ context, value, active }) {
  const { set, descendants } = useContext(context)

  useEffect(() => {
    // The element is not active, remove it
    if (!active) {
      set(descendants => {
        return descendants.filter(d => d !== value)
      })
    } else {
      set(descendants => {
        const existingIndex = descendants.findIndex(d => d === value)

        if (existingIndex !== -1) {
          return descendants
        }

        return [...descendants, value]
      })
    }
  }, [value, active]) // eslint-disable-line

  return descendants.findIndex(d => d === value)
}
