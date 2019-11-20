import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <script
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={{
              __html: `
              window.isLight = false
              try {
                var isLight = window.localStorage.getItem('paco-light-mode')
                if (isLight) {
                  document.querySelector('html').className = 'light'
                  window.isLight = true
                }
              } catch (err) {}
            `
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
