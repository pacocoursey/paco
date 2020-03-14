import React from 'react'

import Post from '@components/post'
import getPosts from '@lib/get-posts'
import getPostsMeta from '@lib/get-posts-meta'
import renderMarkup from '@lib/render-markup'

const Index = props => {
  return <Post {...props} />
}

export const getStaticProps = () => {
  const posts = getPosts()
  const meta = getPostsMeta(posts)
  const post = getPosts().shift()
  const { body, ...rest } = post

  return {
    props: {
      meta,
      ...rest,
      html: renderMarkup(body)
    }
  }
}

export default Index
