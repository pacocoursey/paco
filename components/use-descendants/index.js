import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useLayoutEffect,
  useEffect
} from 'react'

export const createDescendants = () => createContext({})

export const useDescendants = () => {
  const list = useRef([])
  const map = useRef({})
  const [, force] = useState()
  const ref = useRef()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return

    const newList = Array.from(
      ref.current.querySelectorAll('[data-descendant]')
    )

    // If the DOM elements changed (element arrays are different)
    const domListChanged =
      newList.length !== list.current.length ||
      !newList.every((e, i) => {
        return list.current[i].element === e
      })

    if (domListChanged) {
      list.current = newList.map(element => {
        const props = map.current[element.getAttribute('data-descendant')]

        return {
          element,
          ...props
        }
      })
      force({})
    }
  })

  return {
    ref,
    list,
    map,
    force
  }
}

// No idea what the chance of collision is here, probably fine?
const genId = () =>
  `_${Math.random()
    .toString(36)
    .substr(2, 9)}`

export const useDescendant = (ctx, props) => {
  const index = useRef(-1)
  const ref = useRef()
  const { list, map, force } = useContext(ctx)
  const id = useRef(genId())

  useIsomorphicLayoutEffect(() => {
    // Do this once, on mount, so that parent map is populated ASAP
    map.current[id.current] = { ...props, _internalId: id.current }
    force({})

    return () => {
      // Remove from parent "state" on unmount
      delete map.current[id.current]
      list.current = list.current.filter(a => a._internalId !== id.current)

      // Clean up local "state"
      index.current = -1
      id.current = undefined
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    // The item could unmount or un-render with `return null`
    if (ref.current) {
      ref.current.setAttribute('data-descendant', id.current)
    }
  })

  // Keep props up to date on every render
  if (map.current?.[id.current]) {
    map.current[id.current] = { ...props, _internalId: id.current }
  }

  index.current = list.current.findIndex(
    item => item._internalId === id.current
  )

  return { index: index.current, ref, id: id.current }
}

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' && window?.document?.createElement
    ? useLayoutEffect
    : useEffect
