import {
  useState,
  createContext,
  useContext,
  useRef,
  useLayoutEffect,
  useEffect
} from 'react'
import deepEqual from 'fast-deep-equal'

export const createDescendants = () => createContext({})

export const useDescendants = () => {
  const list = useRef([])
  const map = useRef(new Map())
  const [, forceUpdate] = useState()
  const ref = useRef()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return

    const newList = Array.from(
      ref.current.querySelectorAll('[data-descendant]')
    )

    if (
      // If the DOM elements changed
      !deepEqual(
        newList,
        list.current.map(e => e.element)
      )
    ) {
      list.current = newList.map(element => {
        const props = map.current.get(element.getAttribute('data-descendant'))

        return {
          element,
          ...props
        }
      })
      forceUpdate({})
    }
  })

  useEffect(() => {
    return () => {
      // Clear "state"
      list.current = []
      map.current = new Map()
    }
  }, [])

  const [, force] = useState({})

  return {
    ref,
    list,
    map,
    force
  }
}

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
    map.current.set(id.current, { ...props, _internalId: id.current })
    force()

    return () => {
      map.current.delete(id.current)
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    // The item could unmount or un-render with `return null`
    if (ref.current) {
      ref.current.setAttribute('data-descendant', id.current)
    }
  })

  useEffect(() => {
    return () => {
      index.current = -1
      id.current = undefined
    }
  }, [])

  index.current = list.current.findIndex(
    item => item._internalId === id.current
  )

  return { index: index.current, ref, id: id.current }
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' && window?.document?.createElement
    ? useLayoutEffect
    : useEffect

export const useGroup = list => {
  const ref = useRef()
  const hide = ref.current && !ref.current.children.length

  return { ref, hide }
}
