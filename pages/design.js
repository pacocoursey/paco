import Page from '../components/page'
import Links from '../components/links'
import Entry from '../components/entry'

// Data
import useData from '../lib/use-data'
import { data, schema } from '../data/design.json'

const Design = () => {
  const { items: imageItems, filter } = useData(data.filter(x => x.image))
  const { items: nonImageItems } = useData(data.filter(x => !x.image))

  return (
    <Page
      title="Design"
      footer={false}
      content={<Links schema={schema} filter={filter} />}
    >
      <article>
        {imageItems.map(entry => {
          return (
            <Entry
              key={`${entry.title}-${entry.url}`}
              title={entry.title}
              image={entry.image}
              href={entry.url}
              description={entry.description}
            />
          )
        })}

        {nonImageItems.map(entry => {
          return (
            <Entry
              key={`${entry.title}-${entry.url}`}
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

export default Design
