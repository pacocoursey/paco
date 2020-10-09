import Page from '@components/page'
import Link from '@components/link'

const Test = () => {
  return (
    <Page>
      <article>
        <h1>Dark</h1>
        <p>
          <Link href="/" underline>
            Go back home go back home Go back home go back home
          </Link>
        </p>
      </article>
    </Page>
  )
}

export default Test

Test.theme = 'dark'
