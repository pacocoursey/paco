import NextLink from 'next/link'
import cn from 'classnames'

const Preview = ({ post, active }) => {
  const { title, slug, date } = post

  const d = new Date(date)
  const displayDate = `${d.toLocaleString('default', {
    month: 'long'
  })} ${d.getDate()}`

  return (
    <NextLink href="blog/[slug]" as={`/blog/${slug}`}>
      <a className={cn({ active })}>
        <p className="clamp">{title}</p>

        <hr />
        <time>{displayDate}</time>

        <style jsx>{`
          a {
            margin-bottom: var(--gap-half);
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: inherit;
            text-decoration: none;
            transition: color 0.1s ease-in-out;
            color: var(--gray);
          }

          a.active {
            font-weight: 600;
          }

          a.active,
          a.active hr,
          a:hover,
          a:hover hr {
            color: var(--fg);
            border-color: var(--fg);
          }

          p {
            margin: 0;
            flex: 0 1 auto;
          }

          hr {
            flex: 1 0 1rem;
            margin: 0 var(--gap);
            border: none;
            height: 1px;
            border-bottom: 1px solid var(--light-gray);
            width: 100%;
          }

          time {
            flex-shrink: 0;
            font-size: 1.125rem;
          }

          @media (max-width: 600px) {
            hr {
              display: none;
            }
          }
        `}</style>
      </a>
    </NextLink>
  )
}

export default Preview
