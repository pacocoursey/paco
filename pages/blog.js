import React from 'react'

import Page from '../components/page'
import posts from '../data/blog.json'
import Post from '../components/post'

const { data } = posts

const Index = () => {
  // At least one post
  if (data && data.length) {
    return <Post slug={data[0].slug} />
  }

  return (
    <Page title="Oops">
      <article>
        <p>
          No posts yet. Tell me to start writing on Twitter{' '}
          <a
            href="https://twitter.com/pacocoursey"
            target="_blank"
            rel="noopener noreferrer"
          >
            @pacocoursey
          </a>
          .
        </p>
      </article>
    </Page>
  )
}

export default Index
