import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function() {
                try {
                  var mode = localStorage.getItem('theme')
                  if (!mode) return
                  window.theme = mode
                  document.documentElement.classList.add(mode)
                  var bgValue = getComputedStyle(document.documentElement).getPropertyValue('--bg')
                  document.documentElement.style.background = bgValue
                } catch (e) {}
              })()`
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
