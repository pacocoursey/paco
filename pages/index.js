import React from 'react'

import Page from '@components/page'
import PostsList from '@components/posts-list'
import getPosts from '@lib/get-posts'

const Blog = ({ posts }) => {
  return (
    <Page description="Writing about design and code.">
      <h1>Blog</h1>
      <p>Hi, I'm Paco. I'm writing about design and code.</p>
      <p>You should update the logo and SEO data with your own information. Search for "TODO" in your code editor to find relevant places to update.</p>
      <br />
      <article>
        <PostsList posts={posts} />
      </article>
    </Page>
  )
}

export const getStaticProps = () => {
  const posts = getPosts()

  return {
    props: {
      posts
    }
  }
}

export default Blog
