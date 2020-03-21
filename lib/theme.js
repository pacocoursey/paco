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

    const css = document.createElement('style')
    css.type = 'text/css'
    css.appendChild(
      document.createTextNode(
        `* {
          -webkit-transition: none !important;
          -moz-transition: none !important;
          -o-transition: none !important;
          -ms-transition: none !important;
          transition: none !important;
        }`
      )
    )
    document.head.appendChild(css)

    if (val === 'light' || theme === 'dark') {
      setTheme('light')
      setLightMode()
    } else {
      setTheme('dark')
      setDarkMode()
    }

    // eslint-disable-next-line
    const _ = window.getComputedStyle(css).opacity
    document.head.removeChild(css)
  }, [])

  return {
    theme,
    toggleTheme
  }
}

export default useTheme
