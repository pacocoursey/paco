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

export type NonSystemTheme = Exclude<Theme, 'system'>

interface Context {
  forcedTheme?: Theme
  setTheme: (theme: Theme) => void
  theme?: Theme
  resolvedTheme?: NonSystemTheme
  themes: string[]
}

const ThemeContext = createContext<Context>({
  forcedTheme: undefined,
  setTheme: _ => {},
  theme: undefined,
  resolvedTheme: undefined,
  themes: []
})
export const useTheme = () => useContext(ThemeContext)

export interface ThemeProviderProps {
  forcedTheme?: NonSystemTheme
}

export const ThemeProvider: React.FC<any> = ({ Component, children }) => {
  const forcedTheme = Component.theme || null
  const [theme, setThemeState] = useState<Theme | undefined>(() => getTheme())
  const [resolvedTheme, setResolvedTheme] = useState(() => getTheme())

  const handleMediaQuery = useCallback(e => {
    const isDark = e.matches
    const theme = isDark ? 'dark' : 'light'
    changeTheme(theme, 'system')
    setResolvedTheme(theme)
    setThemeState('system')
  }, [])

  useEffect(() => {
    const t = forcedTheme || theme
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    if (t === 'system') {
      media.addListener(handleMediaQuery)
      handleMediaQuery(media)
    }

    return () => media.removeListener(handleMediaQuery)
  }, [theme, forcedTheme, handleMediaQuery])

  const setTheme = useCallback(
    (newTheme: Theme) => {
      if (forcedTheme) {
        console.warn('Cannot setTheme on a page with a forced theme.')
        return
      }

      // If it's not system we can update right away
      if (newTheme !== 'system') {
        changeTheme(newTheme)
        setThemeState(newTheme)
      } else {
        const media = window.matchMedia('(prefers-color-scheme: dark)')
        handleMediaQuery(media)
      }
    },
    [handleMediaQuery, forcedTheme]
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
        themes,
        forcedTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const ThemeScript = () => {
  const { forcedTheme } = useTheme()

  return (
    <NextHead>
      {forcedTheme ? (
        <script
          key="next-themes-script"
          dangerouslySetInnerHTML={{
            __html: `(function() {
          document.documentElement.setAttribute('data-theme', '${forcedTheme}')
        })()`
          }}
        />
      ) : (
        <script
          key="next-themes-script"
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
      )}
    </NextHead>
  )
}

// Helpers

const isServer = typeof window === 'undefined'
const getTheme = (): NonSystemTheme | undefined => {
  if (isServer) return undefined
  return (localStorage.getItem(themeStorageKey) as NonSystemTheme) || undefined
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
