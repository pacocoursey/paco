import Page from '@components/page'
import Entry from '@components/entry/text'

// Data
import useData from '@lib/use-data'
import { data } from '@data/reading.json'

const Reading = () => {
  const { items } = useData(data)

  return (
    <Page
      title="Reading"
      description="Collection of articles, blog posts, and videos that I enjoyed."
    >
      <article>
        <ul>
          {items.map(entry => {
            return (
              <Entry
                key={entry.title}
                title={entry.title}
                image={entry.image}
                href={entry.url}
                type={entry.key}
                comment={entry.comment}
                description={entry.description}
              />
            )
          })}
        </ul>
      </article>
    </Page>
  )
}

export default Reading
