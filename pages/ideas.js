import Page from '@components/page'
import getMarkdown from '@lib/get-markdown'
import Link from '@components/link' // eslint-disable-line

const Ideas = ({ html }) => {
  return (
    <Page
      title="Ideas"
      description="Collections of ideas for side projects and blog posts."
    >
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

export default Ideas
