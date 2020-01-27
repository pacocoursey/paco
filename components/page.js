import Head from 'next/head'

import Header from './header'
import Posts from './posts-list'
import Footer from './footer'

const Page = ({
  header = true,
  footer = true,
  postFooter = false,
  content,
  title,
  slug,
  children
}) => {
  return (
    <div>
      <Head>
        <title>{`${title ? `${title} - ` : ''}Paco Coursey`}</title>
      </Head>

      {header && <Header content={content} title={title} />}
      <main>{children}</main>
      {postFooter && <Posts slug={slug} />}
      {footer && <Footer rss={postFooter} />}

      <style jsx>{`
        div {
          height: 100%;
          padding-bottom: var(--big-gap);
        }
        main {
          max-width: var(--main-content);
          margin: 0 auto;
          padding: 0 var(--gap);
        }
      `}</style>
    </div>
  )
}

export default Page
