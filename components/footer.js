import { GitHub, Twitter } from './icons'
import Link from './link'

const Footer = () => {
  return (
    <footer>
      <Link
        href="https://twitter.com/pacocoursey"
        external
        gray
        style={{ display: 'inline-flex' }}
      >
        <Twitter />
      </Link>

      <Link
        href="https://github.com/pacocoursey"
        external
        gray
        style={{ display: 'inline-flex' }}
      >
        <GitHub />
      </Link>

      {/* <Link href="/feed.xml" external gray>
        RSS
      </Link> */}

      <Link href="/projects" gray>
        Projects
      </Link>

      <Link href="/contact" gray>
        Contact
      </Link>

      <style jsx>{`
        footer {
          margin: 0 auto;
          margin-top: var(--big-gap);
          max-width: var(--main-content);

          display: flex;
          align-items: center;
          justify-content: center;
        }

        footer > :global(*) {
          margin: 0 1rem;
        }
      `}</style>
    </footer>
  )
}

export default Footer
