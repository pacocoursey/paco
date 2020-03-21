import Head from 'next/head'

import Page from '@components/page'
import PostsList from '@components/posts-list'

const Post = ({ title, slug, html, hidden, og, description, date, meta }) => {
  return (
    <Page
      slug={slug}
      title={title}
      description={description}
      image={
        og && `https://res.cloudinary.com/dsdlhtnpw/image/upload/${slug}.png`
      }
      postFooter
    >
      <Head>
        {hidden && <meta name="robots" content="noindex" />}
        {date && <meta name="date" content={date} />}
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
