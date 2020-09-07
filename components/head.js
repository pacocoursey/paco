import NextHead from 'next/head'

const defaultOgImage =
  'https://res.cloudinary.com/dsdlhtnpw/image/upload/v1572673557/og-image_budbm8.png'

const Head = ({
  title = 'Paco Coursey',
  description = "Hi, I'm Paco. Frontend developer and designer.",
  image = defaultOgImage,
  children
}) => {
  return (
    <NextHead>
      {/* Title */}
      <title>{title}</title>
      <meta name="og:title" content={title} />

      {/* Description */}
      <meta name="description" content={description} />
      <meta name="og:description" content={description} />

      {/* Image */}
      <meta name="twitter:image" content={image} />
      <meta name="og:image" content={image} />

      {/* URL */}
      <meta name="og:url" content="https://paco.sh" />

      {/* General */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@pacocoursey" />
      <meta name="apple-mobile-web-app-title" content="Paco" />
      <meta name="author" content="Paco Coursey" />

      {/* RSS feed */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS Feed for paco.sh"
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

      <link
        rel="preload"
        href="https://assets.vercel.com/raw/upload/v1587415301/fonts/2/inter-var-latin.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {children}
    </NextHead>
  )
}

export default Head
