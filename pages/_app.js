import React from 'react'
import Head from 'next/head'
import App from 'next/app'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Paco</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta httpEquiv="Content-Language" content="en" />
          <meta
            name="description"
            content="Hi, I'm Paco. Frontend developer and designer."
          />
          <meta
            name="og:description"
            content="Hi, I'm Paco. Frontend developer and designer."
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@pacocoursey" />
          <meta
            name="twitter:image"
            content="https://res.cloudinary.com/dsdlhtnpw/image/upload/v1572673557/og-image_budbm8.png"
          />
          <meta name="og:title" content="Paco Coursey" />
          <meta name="og:url" content="https://paco.im" />
          <meta
            name="og:image"
            content="https://res.cloudinary.com/dsdlhtnpw/image/upload/v1572673557/og-image_budbm8.png"
          />
          <meta name="apple-mobile-web-app-title" content="Paco" />

          {/* RSS feed */}
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS Feed for paco.im"
            href="/feed.xml"
          />

          {/* Favicons */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#000000"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />
        </Head>

        <Component {...pageProps} />
      </>
    )
  }
}

export default MyApp
