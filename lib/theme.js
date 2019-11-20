const isServer = typeof window === 'undefined'

export function getLightMode() {
  if (!isServer) {
    return window.isLight
  }
  return false
}

export function toggleLightMode() {
  const isLight = getLightMode()

  if (!isLight) {
    try {
      window.localStorage.setItem('paco-light-mode', '1')
      document.querySelector('html').classList.add('light')
      window.isLight = true
    } catch (err) {
      console.error(err)
    }
  } else {
    try {
      window.localStorage.removeItem('paco-light-mode')
      document.querySelector('html').classList.remove('light')
      window.isLight = false
    } catch (err) {
      console.error(err)
    }
  }
}
