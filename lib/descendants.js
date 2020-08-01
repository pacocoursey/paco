import {
  useState,
  createContext,
  useRef,
  useCallback,
  useEffect,
  useContext
} from 'react'

export const useDescendants = () => {
  const list = useRef([])

  const getDOMOrder = useCallback(element => {
    const index = list.current.findIndex(item => {
      if (!item || !element) return false

      return Boolean(
        item.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING
      )
    })

    if (index === -1) {
      return list.current.length
    }

    return index
  }, [])

  const remove = useCallback(element => {
    if (!element) return
    list.current = list.current.filter(el => el !== element)
  }, [])

  const insert = useCallback(
    element => {
      if (!element) {
        return -1
      }

      const insertionIndex = getDOMOrder(element)
      console.log('insert', element, 'at', insertionIndex)
      list.current.splice(insertionIndex, 0, element)
      return insertionIndex
    },
    [] // eslint-disable-line
  )

  useEffect(() => {
    return () => (list.current = [])
  }, [])

  return {
    remove,
    insert
  }
}

export const createDescendants = () => createContext({})
export const useDescendant = (el, ctx) => {
  const { insert, remove } = useContext(ctx)
  const [count, setCount] = useState(0)
  const [, forceUpdate] = useState()
  const countRef = useRef(0)
  const index = useRef(-1)
  const x = useRef()

  // eslint-disable-next-line
  useEffect(() => {
    if (count !== countRef.current) {
      // Skip
      countRef.current = count
      return
    }

    if (!el) {
      forceUpdate({})
    } else {
      x.current = el
      remove(el)
      index.current = insert(el)
      setCount(c => c + 1)
    }

    countRef.current = count
  })

  useEffect(() => {
    return () => {
      remove(x.current)
    }
    // eslint-disable-next-line
  }, [])

  return index.current
}
