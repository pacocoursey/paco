import Page from '@components/page'
import getMarkdown from '@lib/get-markdown'

const Words = ({ html }) => {
  return (
    <Page
      title="Words"
      description="Collection of words I read but didn't understand."
    >
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </Page>
  )
}

export const getStaticProps = async () => {
  const md = await getMarkdown('data/words.md')

  return {
    props: {
      html: md
    }
  }
}

export default Words
