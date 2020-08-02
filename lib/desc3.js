import {
  useState,
  createContext,
  useCallback,
  useContext,
  useRef,
  useLayoutEffect
} from 'react'
import deepEqual from 'fast-deep-equal'

export const useDescendantsInit = () => useState([])

export const useDescendants = () => {
  const list = useRef([])
  const [, forceUpdate] = useState()
  const ref = useRef()

  useLayoutEffect(() => {
    const newList = Array.from(ref.current.querySelectorAll('[data-item]'))

    if (!deepEqual(newList, list.current)) {
      console.log('parent effect', list.current)
      list.current = newList
      forceUpdate({})
    }
  })

  const getList = useCallback(() => list.current, [])

  return {
    ref,
    getList,
    list: list.current
  }
}

export const createDescendants = () => createContext({})
export const useDescendant = ctx => {
  const index = useRef(-1)
  const ref = useRef()
  const { getList } = useContext(ctx)

  useLayoutEffect(() => {
    ref.current.setAttribute('data-item', '')
  })

  if (ref.current) {
    index.current = getList().findIndex(e => e === ref.current)
  }

  return { index: index.current, ref }
}
