import Head from 'next/head'

import Page from './page'

const Post = ({ title, slug, html, hidden, og }) => {
  return (
    <Page slug={slug} title="Blog" content={title} postFooter>
      <Head>
        <title>{title} - Paco Coursey</title>
        {hidden && <meta name="robots" content="noindex" />}
        {og && (
          <meta
            name="og:image"
            content={`https://res.cloudinary.com/dsdlhtnpw/image/upload/${slug}.png`}
          />
        )}
      </Head>

      <article
        dangerouslySetInnerHTML={{
          __html: `<h1>${title}</h1>${html}`
        }}
      />
    </Page>
  )
}

export default Post
