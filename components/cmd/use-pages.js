import React, { useEffect, useState } from 'react'

const usePages = (commandProps, initialPage) => {
  const { setSearch } = commandProps
  const [pages, setPages] = useState([initialPage])

  useEffect(() => {
    setSearch('')
    const input = document.querySelector('[data-command-input]')
    input?.focus()
  }, [pages, setSearch])

  return [pages, setPages]
}

export default usePages
