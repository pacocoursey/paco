import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

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
              ;(function () {
                window.isDark = false
                try {
                  var isDark = window.localStorage.getItem('paco-dark-mode')
                  if (isDark) {
                    document.querySelector('html').className = 'dark'
                    window.isDark = true
                  }
                } catch (err) {}
              })()
            `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
