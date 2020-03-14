import Page from '@components/page'
import Entry from '@components/entry'
import Links from '@components/links'

import useData from '@lib/use-data'
import { data, schema } from '@data/keyboards.json'

const Keyboards = () => {
  const { items, filter } = useData(data)

  return (
    <Page title="Keyboards" content={<Links schema={schema} filter={filter} />}>
      <article>
        {items.map(entry => {
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

export default Keyboards
