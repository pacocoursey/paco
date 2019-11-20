import Preview from './preview'
import Link from './link'

import posts from '../data/blog.json'

const { data } = posts

const Footer = ({ slug }) => {
  return (
    <footer>
      <div>
        <h3>Posts</h3>
        <Link href="/feed.xml" external>
          <h4>RSS</h4>
        </Link>
      </div>

      {data
        .filter(p => p.hidden !== true)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((p, i) => {
          const key = `post-${i}`
          return <Preview key={key} post={p} active={p.slug === slug} />
        })}

      <style jsx>{`
        footer {
          max-width: var(--main-content);
          margin: 0 auto;
          margin-top: var(--big-gap);
          padding: 0 var(--gap);
        }

        h3 {
          font-weight: 600;
        }

        div {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        h4 {
          color: var(--gray);
          transition: color var(--transition);
        }

        h4:hover {
          color: var(--fg);
        }
      `}</style>
    </footer>
  )
}

export default Footer
