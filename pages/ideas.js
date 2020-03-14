import Page from '../components/page'
import getMarkdown from '../lib/get-markdown'

const Music = ({ html }) => {
  return (
    <Page title="Words">
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </Page>
  )
}

export const getStaticProps = async () => {
  const md = await getMarkdown('data/ideas.md')

  return {
    props: {
      html: md
    }
  }
}

export default Music
