import { useCallback } from 'react'
import useSWR from 'swr'

export type Theme = 'dark' | 'light'

export const themeStorageKey = 'theme'

const isServer = typeof window === 'undefined'
const getTheme = (): Theme => (!isServer ? (window as any).theme : 'dark')

const setLightMode = () => {
  try {
    window.localStorage.setItem(themeStorageKey, 'light')
    document.documentElement.classList.add('light')
  } catch (err) {
    console.error(err)
  }
}

const setDarkMode = () => {
  try {
    window.localStorage.setItem(themeStorageKey, 'dark')
    document.documentElement.classList.remove('light')
  } catch (err) {
    console.error(err)
  }
}

const disableAnimation = () => {
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
  const { data: theme, mutate } = useSWR(themeStorageKey, {
    initialData: getTheme()
  })

  const setTheme = useCallback(
    (newTheme: Theme) => {
      const enable = disableAnimation()

      mutate(newTheme, false)

      if (newTheme === 'dark') {
        setDarkMode()
      } else {
        setLightMode()
      }

      enable()
    },
    [mutate]
  )

  return {
    theme,
    setTheme,
    toggleTheme: () => setTheme(!theme || theme === 'dark' ? 'light' : 'dark')
  }
}

export default useTheme
