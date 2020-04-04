import Page from '@components/page'
import Links from '@components/links'
import Entry from '@components/entry/text'

// Data
import useData from '@lib/use-data'
import { data, schema } from '@data/reading.json'

const Reading = () => {
  const { items, filter } = useData(data)

  return (
    <Page
      title="Reading"
      content={<Links schema={schema} filter={filter} />}
      description="Collection of articles, blog posts, and videos that I enjoyed."
    >
      <article>
        {items.map(entry => {
          return (
            <Entry
              key={entry.title}
              title={entry.title}
              image={entry.image}
              href={entry.url}
              description={entry.description}
            />
          )
        })}
      </article>
    </Page>
  )
}

export default Reading
