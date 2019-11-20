import { memo } from 'react'

const TextEntry = ({ title, description, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={`${title} (${description})`}
    >
      <div>
        <p className="title clamp">{title}</p>
        {description && <p className="description clamp">{description}</p>}
      </div>

      <style jsx>{`
        a {
          display: block;
          text-decoration: none;
          color: var(--fg);
          border-radius: var(--radius);
          background: var(--lighter-gray);
          padding: var(--gap-double);
          outline: none;

          display: flex;
          align-items: center;
        }

        a:hover .title,
        a:focus .title,
        a:hover .icon,
        a:focus .icon {
          color: var(--gray);
        }

        p {
          margin: 0;
          line-height: 1.3;
        }

        .title {
          font-size: 1.5rem;
          font-weight: bold;
          transition: color var(--transition);
        }

        .description {
          color: var(--gray);
          font-size: 1.25rem;
          margin-top: var(--gap-half);
        }

        .dot {
          height: 10px;
          width: 10px;
          border-radius: 50%;
          background: var(--color);
          margin-left: var(--gap-double);
        }

        @media (max-width: 600px) {
          .title,
          .description {
            -webkit-line-clamp: 2;
          }
        }
      `}</style>
    </a>
  )
}

export default memo(TextEntry)
