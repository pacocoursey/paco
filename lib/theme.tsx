import { useCallback, useEffect, useState } from 'react'
import NextHead from 'next/head'

export type Theme = 'dark' | 'light' | 'system' | 'pink'
export const themeStorageKey = 'theme'
export const themes = ['dark', 'light', 'system', 'pink']

let mediaQuery: any = null

export const useTheme = () => {
  const [theme, setThemeState] = useState(() => getTheme())
  const [resolvedTheme, setResolvedTheme] = useState(theme)

  const handleMediaQuery = useCallback(e => {
    const isDark = e.matches
    const theme = isDark ? 'dark' : 'light'
    changeTheme(theme, 'system')
    setResolvedTheme(theme)
    setThemeState('system')
  }, [])

  const setTheme = useCallback(
    (newTheme: Theme) => {
      // If it's not system we can update right away
      if (newTheme !== 'system') {
        changeTheme(newTheme)
        setThemeState(newTheme)

        // New theme is not system, we can stop listening to the events
        if (mediaQuery) mediaQuery.removeListener(handleMediaQuery)
        mediaQuery = null
        return
      }

      // Otherwise we need to check the resolved value to see what to
      // apply to the DOM
      if (!mediaQuery) {
        mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        mediaQuery.addListener(handleMediaQuery)
      }

      // Since this is a direct change, update the storage
      handleMediaQuery(mediaQuery)
    },
    [handleMediaQuery]
  )

  useEffect(() => {
    // On mount, check if system theme
    if (theme === 'system') {
      if (!mediaQuery) {
        mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        mediaQuery.addListener(handleMediaQuery)
      }

      handleMediaQuery(mediaQuery)
    }

    return () => {
      // Remove listener on unmount
      if (mediaQuery) mediaQuery.removeListener(handleMediaQuery)
      mediaQuery = null
    }
  }, [handleMediaQuery]) // eslint-disable-line

  useEffect(() => {
    const handleStorage = (e: any) => {
      if (e.key !== 'theme') {
        return
      }

      const theme = e.newValue
      setTheme(theme)
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [setTheme])

  return {
    theme,
    resolvedTheme: theme === 'system' ? resolvedTheme : theme,
    setTheme,
    themes
  }
}

export const InjectTheme = () => {
  useTheme()

  return (
    <NextHead>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function() {
          try {
            var mode = localStorage.getItem('${themeStorageKey}');
            if (!mode) return;
            if (mode === 'system') {
              var darkQuery = '(prefers-color-scheme: dark)'
              var preferDark = window.matchMedia(darkQuery)
              if (preferDark.media === darkQuery && !preferDark.matches) {
                document.documentElement.setAttribute('data-theme', 'light');
              }
            } else {
              document.documentElement.setAttribute('data-theme', mode);
            }
          } catch (e) {}
        })()`
        }}
      />
    </NextHead>
  )
}

// Helpers

const isServer = typeof window === 'undefined'
const getTheme = (): Theme => {
  if (isServer) return 'dark'
  return (localStorage.getItem(themeStorageKey) as Theme) || 'dark'
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

const changeTheme = (theme: string, storageTheme: string = theme) => {
  const enable = disableAnimation()

  if (storageTheme) {
    localStorage.setItem(themeStorageKey, storageTheme)
  }

  document.documentElement.setAttribute('data-theme', theme)
  enable()
}
