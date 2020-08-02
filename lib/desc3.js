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

    if (!deepEqual(newList, list.current)) {
      list.current = newList
      forceUpdate({})
    }
  })

  const getList = useCallback(() => list.current, [])

  useEffect(() => {
    return () => (list.current = [])
  }, [])

  return {
    listRef: ref,
    getList
  }
}

export const createDescendants = () => createContext({})
export const useDescendant = ctx => {
  const index = useRef(-1)
  const ref = useRef()
  const { getList } = useContext(ctx)

  useLayoutEffect(() => {
    ref.current.setAttribute('data-descendant', '')
  })

  if (ref.current) {
    index.current = getList().findIndex(e => e === ref.current)
  }

  return { index: index.current, itemRef: ref }
}
