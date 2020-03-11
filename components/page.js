import Head from 'next/head'

import Header from './header'

const Page = ({
  header = true,
  footer = true,
  postFooter = false,
  content,
  title,
  children
}) => {
  return (
    <div>
      <Head>
        <title>{`${title ? `${title} - ` : ''}Paco Coursey`}</title>
      </Head>

      {header && <Header content={content} title={title} />}
      <main>{children}</main>

      <style jsx>{`
        div {
          height: 100%;
          padding-bottom: var(--small-gap);
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
