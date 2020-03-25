import Page from '@components/page'
import Link from '@components/link'

const About = () => {
  return (
    <Page description="Hi, I'm a wizard. Frontend developer and designer, mechanical keyboard enthusiast, practicing minimalist, and trance lover in search of flow.">
      <article>
        <h1>Paco Coursey</h1>

        <p>
          Frontend developer and designer,{' '}
          <Link underline href="/keyboards">
            mechanical keyboard
          </Link>{' '}
          enthusiast, practicing minimalist, and{' '}
          <Link underline href="/music">
            trance lover
          </Link>{' '}
          in search of flow.
        </p>

        <p>
          Working with{' '}
          <Link underline href="https://zeit.co" external>
            ▲ ZEIT
          </Link>{' '}
          to design better ways to deploy websites.
        </p>
      </article>
    </Page>
  )
}

export default About
