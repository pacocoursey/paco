import Page from '@components/page'
import Link from '@components/link'

const About = () => {
  return (
    <Page description="Hi, I'm Paco. Frontend developer and designer, mechanical keyboard enthusiast, practicing minimalist, and trance lover in search of flow.">
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
          in search of flow.{' '}
          <Link underline href="/blog">
            Writing
          </Link>{' '}
          about design and code.
        </p>

        <p>
          Working with{' '}
          <Link underline href="https://vercel.com" external>
            ▲ Vercel
          </Link>{' '}
          to build better ways to deploy websites.
        </p>
      </article>
    </Page>
  )
}

export default About
