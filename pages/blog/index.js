import React from 'react'

import Post from '../../components/post'
import getPosts from '../../lib/get-posts'
import renderMarkup from '../../lib/render-markup'

const Index = props => {
  return <Post {...props} />
}

export const getStaticProps = () => {
  const posts = getPosts().sort((a, b) => new Date(a.date) - new Date(b.date))
  console.log(posts.map(x => x.title))
  const post = posts.pop()
  const { body, ...rest } = post

  return {
    props: {
      ...rest,
      html: renderMarkup(body)
    }
  }
}

export default Index
