import cn from 'classnames'
import { useInView } from 'react-intersection-observer'
import 'intersection-observer'

const imagePrefix = `https://res.cloudinary.com/dsdlhtnpw/image/fetch/q_60,w_1000`

const Entry = ({ title, description, image, href, position }) => {
  const [ref, inView] = useInView({ triggerOnce: true })

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      className={cn({ active: !image })}
      title={`${title} - ${description}`}
    >
      <section>
        <div>
          <p className="title clamp">{title}</p>
          <p className="description clamp">{description}</p>
        </div>
      </section>

      <style jsx>{`
        section {
          /* Lazy load the background image */
          background-image: ${image
            ? !inView
              ? 'none'
              : `url('${imagePrefix}/${encodeURIComponent(image)}')`
            : 'none'};
          background-position: ${position ? position : 'center'};
        }
      `}</style>

      <style jsx>{`
        a {
          width: 100%;
          display: block;
          text-decoration: none;
          outline: none;
        }

        section {
          position: relative;
          height: calc(1.5 * var(--big-gap));
          object-fit: cover;
          background-size: cover;
          background-repeat: no-repeat;
          background-color: var(--lighter-gray);
          border-radius: var(--radius);
          overflow: hidden;
        }

        section::before {
          content: '';
          pointer-events: none;
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border-radius: var(--radius);
          background: radial-gradient(
            circle at center,
            white 10%,
            whitesmoke 11%,
            whitesmoke 100%
          );
          z-index: -1;
        }

        section::after {
          content: '';
          pointer-events: none;
          position: absolute;
          z-index: 1;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          opacity: 0.3;
          border-radius: var(--radius);
          background: linear-gradient(
            to bottom left,
            rgba(0, 0, 0, 0.1) 20%,
            rgba(0, 0, 0, 0.6) 100%
          );
          transition: opacity var(--transition-slow),
            transform var(--transition-slow);
        }

        a:hover section::after,
        a:focus section::after,
        a.active section::after {
          opacity: 1;
        }

        div {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          z-index: 2;
          opacity: 0;
          transform: translateY(10%);
          transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
        }

        a:hover div,
        a:focus div,
        a.active div {
          transform: none;
          opacity: 1;
        }

        .title,
        .description {
          margin: 0;
          line-height: normal;
        }

        .title {
          color: #fff;
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: var(--gap);
        }

        .description {
          font-weight: 500;
          color: #eaeaea;
        }

        @media (hover: none) {
          div {
            transform: none;
            opacity: 1;
          }

          section::after {
            opacity: 1;
          }
        }
      `}</style>
    </a>
  )
}

export default Entry
