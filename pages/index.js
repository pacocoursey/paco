import Page from '../components/page'
import Link from '../components/link'

const About = () => {
  return (
    <Page
      title="Home"
      content={
        <div className="flex">
          <Link className="l-h invert active" href="/">
            About
          </Link>
          <Link className="l-h blue" href="/blog">
            Blog
          </Link>
          <Link className="l-h red" href="/reading">
            Reading
          </Link>
          <Link className="l-h indigo" href="/design">
            Design
          </Link>
        </div>
      }
    >
      <article>
        <h1>Paco Coursey</h1>

        <p>
          Frontend developer and designer,{' '}
          <Link className="l-i blue-gray" href="/keyboards">
            mechanical keyboard
          </Link>{' '}
          enthusiast, practicing minimalist, and{' '}
          <Link className="l-i green" href="/music">
            trance lover
          </Link>{' '}
          in search of flow.
        </p>

        <p>
          Working with{' '}
          <Link className="l-i invert" href="https://zeit.co" external>
            ▲ ZEIT
          </Link>{' '}
          to design better ways to deploy websites.
        </p>
      </article>
    </Page>
  )
}

export default About
