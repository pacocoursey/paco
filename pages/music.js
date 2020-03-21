import Page from '@components/page'
import Links from '@components/links'
import Entry from '@components/entry'

// Data
import useData from '@lib/use-data'
import { data, schema } from '@data/music.json'

const Music = () => {
  const { items, filter } = useData(data)

  return (
    <Page
      title="Music"
      content={<Links schema={schema} filter={filter} />}
      description="Collection of exemplary electronic music."
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

export default Music
