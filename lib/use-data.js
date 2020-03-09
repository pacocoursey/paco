import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const useData = data => {
  const { query } = useRouter()
  const { filter } = query

  const [items, setItems] = useState(data)

  useEffect(() => {
    if (!filter) {
      if (items !== data) setItems(data)
      return
    }

    const filtered = data.filter(i => i.key === filter)
    setItems(filtered)
  }, [filter]) // eslint-disable-line

  return { filter, items }
}

export default useData
