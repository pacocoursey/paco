import Head from '@components/head'

import Header from '@components/header'

const Page = ({
  header = true,
  footer = true,
  postFooter = false,
  content,
  title,
  description,
  image,
  children
}) => {
  return (
    <div>
      <Head
        title={`${title ? `${title} - ` : ''}Paco Coursey`}
        description={description}
        image={image}
      />

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
