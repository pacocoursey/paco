import Page from '@components/page'
import getMarkdown from '@lib/get-markdown'
import Link from '@components/link' // eslint-disable-line

const Quotes = ({ html }) => {
  return (
    <Page
      title="Quotes"
      description="Collection of notable quotes encountered in reading."
    >
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </Page>
  )
}

export const getStaticProps = async () => {
  const md = await getMarkdown('data/quotes.md')

  return {
    props: {
      html: md
    }
  }
}

export default Quotes
