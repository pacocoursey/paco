import React, { useState, useEffect, useCallback } from 'react'
import { useDescendants } from 'use-descendants'
import matchSorter from 'match-sorter'

const inputs = ['select', 'button', 'textarea']

const useCommand = ({
  search: searchProp = '',
  selected: selectedProp = 0,
  ordering = true,
  filter = defaultFilter,
  rotate = false,
  element
} = {}) => {
  const { ref: listRef, ...listProps } = useDescendants()
  const [selected, setSelected] = useState(selectedProp)
  const [search, setSearch] = useState(searchProp)

  const filterList = filter(listProps.map, search)

  useKeydown({
    setSelected,
    selected,
    descendants: listProps.list.current,
    rotate,
    element
  })

  const handleSearch = useCallback(e => {
    setSearch(e.target.value)
  }, [])

  return {
    search,
    selected,
    setSelected,
    setSearch: handleSearch,
    filterList,
    ordering,
    listRef,
    ...listProps
  }
}

export default useCommand

// Helpers

function defaultFilter(map, filter) {
  const values = Object.values(map.current)

  if (!values.length) {
    return null
  }

  const filterList = matchSorter(values, filter, {
    keys: [
      props => {
        return props?.value || null
      }
    ]
  })

  return filterList
}

const useKeydown = ({
  setSelected,
  descendants,
  selected,
  rotate,
  element
}) => {
  const setLast = useCallback(() => {
    setSelected(descendants.length - 1)
  }, [setSelected, descendants])

  const setFirst = useCallback(() => {
    setSelected(0)
  }, [setSelected])

  const setNext = useCallback(() => {
    const atBottom = selected === descendants.length - 1

    if (atBottom) {
      if (rotate) {
        // Loop back to the top
        setSelected((selected + 1) % descendants.length)
      }
    } else {
      setSelected(selected + 1)
    }
  }, [selected, rotate, descendants, setSelected])

  const setPrev = useCallback(() => {
    const atTop = selected === 0

    if (atTop) {
      if (rotate) {
        // Loop back to bottom
        setLast()
      }
    } else {
      setSelected(selected - 1)
    }
  }, [setSelected, selected, setLast, rotate])

  useEffect(() => {
    function handleKey(e) {
      switch (e.key) {
        case 'Home': {
          e.preventDefault()
          setFirst()
          break
        }
        case 'End': {
          e.preventDefault()
          setLast()
          break
        }
        case 'ArrowDown': {
          e.preventDefault()
          setNext()
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          setPrev()
          break
        }
        case 'Enter': {
          const cb = descendants[selected]?.callback

          if (!cb) {
            return
          }

          if (document.activeElement) {
            // Ignore [Enter] when button, select, textarea, or contentEditable is focused
            if (
              inputs.indexOf(document.activeElement.tagName.toLowerCase()) !==
                -1 ||
              document.activeElement.contentEditable === 'true'
            ) {
              return
            }

            // Ignore [Enter] on inputs that aren't a CommandInput
            if (!document.activeElement.hasAttribute('data-command-input')) {
              return
            }
          }

          cb()
          break
        }
        default:
          break
      }
    }

    const el = element || window

    el.addEventListener('keydown', handleKey)
    return () => el.removeEventListener('keydown', handleKey)
  }, [
    selected,
    descendants,
    setSelected,
    setFirst,
    setLast,
    setNext,
    setPrev,
    element
  ])
}
