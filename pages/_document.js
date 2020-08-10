import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

import { themeStorageKey } from '@lib/theme'
const backgrounds = {
  dark: '#131415',
  light: '#fff'
}

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
                  var mode = localStorage.getItem('${themeStorageKey}');
                  if (!mode) return;
                  document.documentElement.setAttribute('data-theme', mode);
                  document.documentElement.style.background =
                    mode === 'dark' ? '${backgrounds.dark}' : '${backgrounds.light}';
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
