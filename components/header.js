import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'

import { toggleLightMode } from '../lib/theme'
import scrollToTop from '../lib/scroll-to-top'

const Logo = () => {
  return (
    <Link href="/">
      <a aria-label="Navigate Home">
        <svg height="30" viewBox="0 0 43 50" fill="var(--fg)">
          <path d="M9.41558 50C4.56115 50 2.23885 47.3933 1.14535 45.2065C0.012987 42.9417 0 40.6797 0 40.5844V9.41558C0 9.32045 0.012987 7.05823 1.14535 4.79351C2.23885 2.60671 4.56115 0 9.41558 0H25C25.1747 0 29.3275 0.0241342 33.5182 2.11937C37.4824 4.10152 42.2078 8.32814 42.2078 17.2078C42.2078 26.0874 37.4824 30.3141 33.5182 32.2961C29.3275 34.3914 25.1747 34.4156 25 34.4156H18.8312V40.5844C18.8312 40.6797 18.8182 42.9417 17.6858 45.2065C16.5923 47.3933 14.27 50 9.41558 50ZM3.24675 40.5844C3.24686 40.5936 3.27175 42.2568 4.09307 43.8403C5.10974 45.8004 6.85076 46.7532 9.41558 46.7532C12.0175 46.7532 13.7728 45.7724 14.7817 43.7545C15.5626 42.1929 15.5844 40.6001 15.5844 40.5844V34.4825C14.1437 34.5769 11.9361 34.8047 9.76115 35.3532C5.43853 36.4434 3.24675 38.2035 3.24675 40.5844ZM17.2078 31.1688H25C25.0326 31.1687 28.649 31.1319 32.1601 29.3448C36.6728 27.0478 38.961 22.9643 38.961 17.2078C38.961 11.4104 36.6412 7.31093 32.0662 5.02348C28.5535 3.2671 25.0351 3.24675 25 3.24675H9.41558C6.81364 3.24675 5.05833 4.2276 4.04946 6.24545C3.26861 7.80714 3.24675 9.39989 3.24675 9.41558V34.6601C4.59318 33.6926 6.45996 32.8318 9.02186 32.1913C13.0654 31.1804 17.0406 31.1688 17.2078 31.1688Z" />
        </svg>

        <style jsx>{`
          svg {
            transition: fill 0.1s ease-in;
          }

          a {
            outline: none;
            display: inline-flex;
          }

          a:focus svg,
          svg:hover,
          svg:focus {
            fill: var(--gray);
          }

          @media (max-width: 600px) {
            svg {
              height: 30px;
              width: auto;
            }
          }
        `}</style>
      </a>
    </Link>
  )
}

const Toggle = () => {
  return (
    <button
      onClick={toggleLightMode}
      aria-label="Toggle Theme"
      title="Toggle Theme"
      type="button"
    >
      <style jsx>{`
        button {
          --size: 20px;
          height: var(--size);
          width: var(--size);
          border: 2px solid var(--fg);
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          transition: border-color 0.1s ease-in-out;
        }

        button:hover,
        button:focus {
          outline: none;
          border-color: var(--gray);
        }
      `}</style>
    </button>
  )
}

const Description = ({ children, ...props }) => {
  const [scroll, setScroll] = useState('0%')

  const onScroll = useCallback(() => {
    window.requestAnimationFrame(() => {
      const h = document.documentElement
      const b = document.body
      const st = 'scrollTop'
      const sh = 'scrollHeight'
      const percent =
        ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
      setScroll(`${percent}%`)
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{ '--p': scroll }}
      {...props}
      onClick={scrollToTop}
      title="Scroll to top"
    >
      {children}

      <style jsx>{`
        div {
          --p: 0%;

          cursor: pointer;
          background-image: linear-gradient(
            to right,
            var(--fg) var(--p),
            transparent var(--p)
          );
          background-clip: text;
          -webkit-background-clip: text;
          color: var(--gray-alpha);
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}

const Header = ({ title, content }) => {
  return (
    <nav>
      <div className="header">
        <div className="logo">
          <Logo />
        </div>

        <div className="title" onClick={scrollToTop} title="Scroll to top">
          {title}
        </div>

        {content && typeof content === 'string' ? (
          <div className="content">
            <Description>{content}</Description>
          </div>
        ) : (
          <div className="content">{content}</div>
        )}

        <div className="toggle">
          <Toggle />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          nav {
            position: ${content ? 'sticky' : 'static'};
          }
        }
      `}</style>

      <style jsx>{`
        nav {
          z-index: 10;
          margin: var(--small-gap) auto var(--big-gap) auto;
          position: sticky;
          padding: var(--gap) 0;
          top: 0;
          background-color: var(--header-bg);
          backdrop-filter: saturate(180%) blur(20px);
          transition: background-color var(--transition);
        }

        .header {
          margin: 0 auto;
          padding: 0 var(--gap);
          max-width: calc(1.5 * var(--main-content));
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }

        .logo,
        .toggle,
        .content {
          display: flex;
          align-items: center;
        }

        .logo {
          flex-basis: calc(0.25 * var(--main-content));
        }

        .title {
          cursor: pointer;
          font-weight: bold;
          flex-basis: 100px;
        }

        .content {
          flex: 1;
          min-height: var(--gap-double);
          max-width: calc(var(--main-content) - 100px);
        }

        .toggle {
          flex: 1;
          justify-content: flex-end;
        }

        .m {
          display: none;
        }

        @media (max-width: 960px) {
          nav {
            margin: var(--gap-double) 0;
            padding: 0;
            top: calc(-1 * (30px + var(--gap)));
          }

          .header {
            max-width: var(--main-content);
          }

          .content,
          .description {
            order: 4;
            flex-basis: 100%;
            margin: var(--gap) 0;
            padding-top: var(--gap);
            max-width: unset;
            display: flex;

            overflow: auto;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .content::-webkit-scrollbar {
            display: none;
          }

          .logo,
          .title,
          .toggle {
            flex: 1;
            flex-basis: unset;
          }

          .title {
            text-align: center;
          }
        }
      `}</style>
    </nav>
  )
}

export default Header
