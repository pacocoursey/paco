import { useMemo } from 'react'
import Head from 'next/head'

import renderMarkup from '../lib/render-markup'
import Page from './page'
import Error from './error'
import posts from '../data/blog.json'

const { data } = posts

const Post = ({ slug }) => {
  const activePost = useMemo(() => {
    return data.filter(p => String(p.slug) === slug)
  }, [slug])

  if (!activePost || activePost.length === 0) {
    // 404
    return <Error status={404} />
  }

  return (
    <Page slug={slug} title="Blog" content={activePost[0].title} footer>
      <Head>
        <title>{activePost[0].title} - Paco Coursey</title>
        {activePost[0].hidden && <meta name="robots" content="noindex" />}
      </Head>

      <article
        dangerouslySetInnerHTML={{
          __html: `<h1>${activePost[0].title}</h1>${renderMarkup(
            activePost[0].body
          )}`
        }}
      />
    </Page>
  )
}

export default Post
