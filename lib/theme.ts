import { useCallback, useEffect } from 'react'
import useSWR from 'swr'

export type Theme = 'dark' | 'light'

export const themeStorageKey = 'theme'

const isServer = typeof window === 'undefined'
const getTheme = (): Theme => {
  if (isServer) return 'dark'
  return (localStorage.getItem(themeStorageKey) as Theme) || 'dark'
}

const setLightMode = () => {
  try {
    localStorage.setItem(themeStorageKey, 'light')
    document.documentElement.setAttribute('data-theme', 'light')
  } catch (err) {
    console.error(err)
  }
}

const setDarkMode = () => {
  try {
    localStorage.setItem(themeStorageKey, 'dark')
    document.documentElement.setAttribute('data-theme', 'dark')
  } catch (err) {
    console.error(err)
  }
}

const disableAnimation = () => {
  document.documentElement.style.background = ''
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

  return () => {
    // Force restyle
    ;(() => window.getComputedStyle(css).opacity)()
    document.head.removeChild(css)
  }
}

const useTheme = () => {
  const { data: theme, mutate } = useSWR(themeStorageKey, getTheme, {
    initialData: getTheme()
  })

  const setTheme = useCallback(
    (newTheme: Theme) => {
      mutate(newTheme, false)
    },
    [mutate]
  )

  useEffect(() => {
    // Disabling/enabling animation is expensive, don't run
    // on initial render
    if (theme === document.documentElement.getAttribute('data-theme')) {
      return
    }

    const enable = disableAnimation()

    if (theme === 'dark') {
      setDarkMode()
    } else {
      setLightMode()
    }

    enable()
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(!theme || theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return {
    theme,
    setTheme,
    toggleTheme
  }
}

export default useTheme
