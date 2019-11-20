import Page from '../components/page'

// Data
import useData from '../lib/use-data'
import { data } from '../data/words.json'

const Music = () => {
  const { items } = useData(data)

  return (
    <Page title="Words">
      <article>
        <h1>Words</h1>
        <p>Words that I read but didn't understand.</p>

        {items.map(entry => {
          return (
            <ul key={entry.word}>
              <li key={entry.word}>
                <b>{entry.word}</b>: {entry.definition}
              </li>
            </ul>
          )
        })}
      </article>
    </Page>
  )
}

export default Music
