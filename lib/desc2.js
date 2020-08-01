import {
  useState,
  createContext,
  useCallback,
  useContext,
  useLayoutEffect
} from 'react'
import { usePrevious } from '@reach/utils'

export const useDescendantsInit = () => useState([])

export const useDescendants = (list, setList) => {
  const getDOMOrder = useCallback((element, list) => {
    const index = list.findIndex(desc => {
      const item = desc.element
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

  const remove = useCallback(
    descendant => {
      if (!descendant.element) return
      setList(list => list.filter(el => el.element !== descendant.element))
    },
    [setList]
  )

  const insert = useCallback(
    descendant => {
      if (!descendant.element) {
        return -1
      }

      setList(list => {
        const insertionIndex = getDOMOrder(descendant.element, list)
        const l = [...list]
        l.splice(insertionIndex, 0, descendant)
        return l
      })
    },
    [getDOMOrder, setList]
  )

  return {
    remove,
    insert,
    list
  }
}

export const createDescendants = () => createContext({})
export const useDescendant = (descendant, ctx) => {
  const { list, insert, remove } = useContext(ctx)
  const [, forceUpdate] = useState()
  const index = list.findIndex(e => e.element === descendant.element)

  let previousDescendants = usePrevious(list)

  let someDescendantsHaveChanged = list.some((descendant, index) => {
    return descendant.element !== previousDescendants?.[index]?.element
  })

  useLayoutEffect(() => {
    if (!descendant.element) {
      forceUpdate({})
    }

    insert(descendant)

    return () => {
      remove(descendant)
    }
  }, [
    index,
    insert,
    remove,
    someDescendantsHaveChanged,
    ...Object.values(descendant)
  ])

  return index
}
