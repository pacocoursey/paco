import React from 'react'
import Router from 'next/router'
import App from 'next/app'
import nprogress from 'nprogress'
import debounce from 'lodash.debounce'
import NextHead from 'next/head'

// Only show nprogress after 500ms (slow loading)
const start = debounce(nprogress.start, 500)
Router.events.on('routeChangeStart', start)
Router.events.on('routeChangeComplete', url => {
  start.cancel()
  nprogress.done()
  window.scrollTo(0, 0)
})
Router.events.on('routeChangeError', () => {
  start.cancel()
  nprogress.done()
})

import '@styles/global.css'
import { themeStorageKey } from '@lib/theme'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Component {...pageProps} />
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
      </>
    )
  }
}

export default MyApp
