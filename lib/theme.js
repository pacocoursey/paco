import { useState, useCallback } from 'react'

const isServer = typeof window === 'undefined'
const getTheme = () =>
  !isServer ? (window.isLight ? 'light' : 'dark') : 'dark'

const setLightMode = () => {
  try {
    window.localStorage.setItem('paco-light-mode', '1')
    document.querySelector('html').classList.add('light')
    window.isLight = true
  } catch (err) {
    console.error(err)
  }
}

const setDarkMode = () => {
  try {
    window.localStorage.removeItem('paco-light-mode')
    document.querySelector('html').classList.remove('light')
    window.isLight = false
  } catch (err) {
    console.error(err)
  }
}

const useTheme = () => {
  const [theme, setTheme] = useState(getTheme())

  const toggleTheme = useCallback(val => {
    const theme = getTheme()

    if (val === 'light' || theme === 'dark') {
      setTheme('light')
      return setLightMode()
    }

    setTheme('dark')
    return setDarkMode()
  }, [])

  return {
    theme,
    toggleTheme
  }
}

export default useTheme
