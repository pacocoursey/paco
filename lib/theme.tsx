import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import NextHead from 'next/head'

export type Theme = 'dark' | 'light' | 'system'
export const themeStorageKey = 'theme'
export const themes = ['dark', 'light', 'system']

const ThemeContext = createContext({})
export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setThemeState] = useState(() => getTheme())
  const [resolvedTheme, setResolvedTheme] = useState(theme)

  const handleMediaQuery = useCallback(e => {
    const isDark = e.matches
    const theme = isDark ? 'dark' : 'light'
    changeTheme(theme, 'system')
    setResolvedTheme(theme)
    setThemeState('system')
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    if (theme === 'system') {
      media.addListener(handleMediaQuery)
      handleMediaQuery(media)
    }

    return () => media.removeListener(handleMediaQuery)
  }, [theme, handleMediaQuery])

  const setTheme = useCallback(
    (newTheme: Theme) => {
      // If it's not system we can update right away
      if (newTheme !== 'system') {
        changeTheme(newTheme)
        setThemeState(newTheme)
      } else {
        const media = window.matchMedia('(prefers-color-scheme: dark)')
        handleMediaQuery(media)
      }
    },
    [handleMediaQuery]
  )

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

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme: theme === 'system' ? resolvedTheme : theme,
        setTheme,
        themes
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const ThemeScript = () => {
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
