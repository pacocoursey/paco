import {
  useState,
  createContext,
  useRef,
  useCallback,
  useEffect,
  useContext,
  useLayoutEffect
} from 'react'
import { usePrevious } from '@reach/utils'

export const useDescendants = () => {
  const [list, setList] = useState([])

  const getDOMOrder = useCallback((element, list) => {
    const index = list.findIndex(item => {
      if (!item || !element) return false

      return Boolean(
        item.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING
      )
    })

    if (index === -1) {
      return list.length
    }

    return index
  }, [])

  const remove = useCallback(element => {
    if (!element) return
    // console.log('remove', element)
    setList(list => list.filter(el => el !== element))
  }, [])

  const insert = useCallback(
    element => {
      if (!element) {
        return -1
      }

      setList(list => {
        const insertionIndex = getDOMOrder(element, list)
        // console.log('insert', element, 'at', insertionIndex)
        const l = [...list]
        l.splice(insertionIndex, 0, element)
        return l
      })
    },
    [getDOMOrder]
  )

  return {
    remove,
    insert,
    list
  }
}

export const createDescendants = () => createContext({})
export const useDescendant = (el, ctx) => {
  const { list, insert, remove } = useContext(ctx)
  const [, forceUpdate] = useState()
  const index = list.findIndex(e => e === el)

  let previousDescendants = usePrevious(list)

  let someDescendantsHaveChanged = list.some((descendant, index) => {
    return descendant !== previousDescendants?.[index]
  })

  useLayoutEffect(() => {
    if (!el) {
      // console.log('force update')
      forceUpdate({})
    }

    insert(el)

    return () => {
      remove(el)
    }
  }, [index, el, insert, remove, someDescendantsHaveChanged])

  return index
}
