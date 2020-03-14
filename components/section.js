import Link from '@components/link'

const Section = ({ title, icon: Icon, href, as, color, size = 50 }) => {
  return (
    <Link href={href} as={as} passHref>
      <a>
        <div>
          <Icon size={size} color={color} />
        </div>
        <span>{title}</span>

        <style jsx>{`
          a {
            position: relative;
            text-decoration: none;
            flex: 1;
            border-radius: var(--inline-radius);
            cursor: pointer;
            display: inline-flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: var(--small-gap) var(--gap);
            border: none;
            color: var(--fg);
          }

          a:hover,
          a:focus,
          a:focus-within {
            outline: none;
          }

          a:hover span,
          a:focus span {
            filter: none;
            opacity: 1;
            transform: none;
          }

          a:hover div,
          a:focus div {
            filter: none;
            transform: translateY(-10px);
          }

          div {
            display: inline-flex;
            filter: opacity(20%) grayscale(1);
            transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
          }

          span {
            pointer-events: none;
            position: absolute;
            top: 55%;
            font-weight: 600;
            font-size: 1.25rem;
            opacity: 0;
            margin-top: var(--gap);
            line-height: normal;
            transform: translateY(10px);
            color: ${color};
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
          }
        `}</style>
      </a>
    </Link>
  )
}

export default Section
