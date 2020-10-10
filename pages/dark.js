import Page from '@components/page'
import Link from '@components/link'

const Test = () => {
  return (
    <Page description="Hi, I'm Paco. Frontend developer and designer, mechanical keyboard enthusiast, practicing minimalist, and trance lover in search of flow.">
      Hello!
      <p>
        <Link href="/">Go back home</Link>
      </p>
    </Page>
  )
}

export default Test

Test.theme = 'dark'
