import Page from '../components/page'
import Link from '../components/link'

const About = () => {
  return (
    <Page
      footer={false}
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

        <ul className="flex links">
          <li>
            <Link href="/projects" className="reset">
              Projects
            </Link>
          </li>

          <li>
            <Link href="/contact" className="reset">
              Contact
            </Link>
          </li>

          <li>
            <Link
              href="https://twitter.com/pacocoursey"
              external
              className="reset"
            >
              Twitter
            </Link>
          </li>

          <li>
            <Link
              href="https://github.com/pacocoursey"
              external
              className="reset"
            >
              GitHub
            </Link>
          </li>
        </ul>
      </article>

      <style jsx>{`
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          margin-top: var(--small-gap);
        }

        ul li + li {
          margin-left: var(--gap);
        }

        li {
          font-size: 1rem;
        }
      `}</style>
    </Page>
  )
}

export default About
