import {
  useState,
  createContext,
  useCallback,
  useContext,
  useRef,
  useLayoutEffect,
  useEffect
} from 'react'
import deepEqual from 'fast-deep-equal'

export const useDescendantsInit = () => useState([])

export const useDescendants = () => {
  const list = useRef([])
  const [, forceUpdate] = useState()
  const ref = useRef()

  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }

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

  const getList = useCallback(() => list.current, [])

  useEffect(() => {
    return () => (list.current = [])
  }, [])

  return {
    listRef: ref,
    getList,
    list
  }
}

export const createDescendants = () => createContext({})
export const useDescendant = (ctx, props) => {
  const index = useRef(-1)
  const ref = useRef()
  const { getList, list } = useContext(ctx)

  useLayoutEffect(() => {
    ref.current.setAttribute('data-descendant', '')
  })

  if (ref.current) {
    index.current = list.current.findIndex(e => e.element === ref.current)

    // Add any additional props to the descendant item
    // Since it's all refs, non-memoized functions are ok!
    list.current[index.current] = { ...list.current[index.current], ...props }
  }

  return { index: index.current, itemRef: ref }
}
