import { useCallback } from 'react'
import useSWR from 'swr'

const isServer = typeof window === 'undefined'
const getTheme = () => (!isServer ? window.theme : 'dark')

const setLightMode = () => {
  try {
    window.localStorage.setItem('theme', 'light')
    document.querySelector('html').classList.add('light')
  } catch (err) {
    console.error(err)
  }
}

const setDarkMode = () => {
  try {
    window.localStorage.setItem('theme', 'dark')
    document.querySelector('html').classList.remove('light')
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
  // eslint-disable-next-line
  const _ = window.getComputedStyle(css).opacity

  return () => {
    document.head.removeChild(css)
  }
}

const useTheme = () => {
  const { data: theme, mutate } = useSWR('theme', {
    initialData: getTheme()
  })

  const setTheme = useCallback(
    newTheme => {
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
    setTheme
  }
}

export default useTheme
