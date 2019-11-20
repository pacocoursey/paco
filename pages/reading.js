import Page from '../components/page'
import Links from '../components/links'
import Entry from '../components/text-entry'

// Icons
import Sparkles from '../components/icons/sparkles'

// Data
import useData from '../lib/use-data'
import { data, schema } from '../data/reading.json'

const Reading = () => {
  const { items, filter } = useData(data)

  return (
    <Page
      title="Reading"
      footer={false}
      content={<Links schema={schema} filter={filter} />}
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
              icon={entry.pinned && Sparkles}
            />
          )
        })}
      </article>
    </Page>
  )
}

export default Reading
