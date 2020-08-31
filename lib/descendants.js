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
  const [, forceUpdate] = useState()
  const ref = useRef()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return

    const newList = Array.from(
      ref.current.querySelectorAll('[data-descendant]')
    )

    if (
      !deepEqual(
        newList,
        list.current.map(e => e.element)
      )
    ) {
      list.current = newList.map(e => ({ element: e }))
      forceUpdate({})
    }
  })

  useEffect(() => {
    return () => (list.current = [])
  }, [])

  return {
    listRef: ref,
    list
  }
}

// const genId = () =>
//   `_${Math.random()
//     .toString(36)
//     .substr(2, 9)}`

export const useDescendant = (ctx, props) => {
  const index = useRef(-1)
  const ref = useRef()
  const { list } = useContext(ctx)
  // const id = useRef(genId())

  useIsomorphicLayoutEffect(() => {
    // The item could unmount or un-render with `return null`
    if (ref.current) {
      ref.current.setAttribute('data-descendant', '')
    }
  })

  if (ref.current) {
    index.current = list.current.findIndex(e => e.element === ref.current)

    // Add any additional props to the descendant item
    // Since it's all refs, non-memoized functions are ok!

    // THIS IS NOT SAFE, since it won't trigger a re-render.
    list.current[index.current] = { ...list.current[index.current], ...props }
  }

  return { index: index.current, itemRef: ref }
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
    ? useLayoutEffect
    : useEffect
