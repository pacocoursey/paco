import Head from 'next/head'

import Page from '@components/page'
import PostsList from '@components/posts-list'

const Post = ({ title, slug, html, hidden, og, meta }) => {
  return (
    <Page slug={slug} title="Blog" postFooter>
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

      <PostsList slug={slug} meta={meta} />
    </Page>
  )
}

export default Post
