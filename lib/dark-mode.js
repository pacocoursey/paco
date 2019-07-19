/* global window, document */

const isServer = typeof window === 'undefined';

export function getDarkMode() {
  if (!isServer) {
    return window.isDark;
  }
  return false;
}

export function toggleDarkMode() {
  const isDark = getDarkMode();

  if (!isDark) {
    try {
      window.localStorage.setItem('paco-dark-mode', '1');
      document.querySelector('html').classList.add('dark');
      window.isDark = true;
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      window.localStorage.removeItem('paco-dark-mode');
      document.querySelector('html').classList.remove('dark');
      window.isDark = false;
    } catch (err) {
      console.error(err);
    }
  }
}
