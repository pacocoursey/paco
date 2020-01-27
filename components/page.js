import Head from 'next/head'

import Header from './header'
import Posts from './posts'
import Footer from './footer'

const Page = ({
  header = true,
  footer = true,
  postFooter = false,
  content,
  title,
  slug,
  children
}) => {
  return (
    <div>
      <Head>
        <title>{`${title ? `${title} - ` : ''}Paco Coursey`}</title>
      </Head>

      {header && <Header content={content} title={title} />}
      <main>{children}</main>
      {postFooter && <Posts slug={slug} />}
      {footer && <Footer />}

      <style jsx global>{`
        :root {
          /* Spacing */
          --gap-quarter: 0.25rem;
          --gap-half: 0.5rem;
          --gap: 1rem;
          --gap-double: 2rem;
          --small-gap: 4rem;
          --big-gap: 10rem;
          --main-content: 45rem;
          --radius: 8px;
          --inline-radius: 5px;

          /* Dark Mode Colors */
          --bg: #131415;
          --fg: #fafbfc;
          --gray: #666;
          --light-gray: #444;
          --lighter-gray: #222;
          --article-color: #eaeaea;
          --header-bg: rgba(19, 20, 21, 0.8);
          --gray-alpha: rgba(255, 255, 255, 0.3);
          --selection: rgba(255, 255, 255, 0.99);

          /* Syntax Highlighting */
          --token: #888;
          --comment: #666;
          --name: #b5b5b5;

          /* Static Colors */
          --blue: #007aff;
          --green: #34c759;
          --indigo: #5856d6;
          --orange: #ff9500;
          --pink: #ff2d55;
          --purple: #af52de;
          --red: #ff3b30;
          --teal: #5ac8fa;
          --yellow: #ffcc00;
          --blue-gray: #37609c;

          /* Typography */
          --font-sans: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          --font-mono: 'Consolas', monospace;

          /* Transitions */
          --transition: 0.1s ease-in-out;
          --transition-slow: 0.3s ease-in-out;
        }

        .light {
          --bg: #fff;
          --fg: #000;
          --gray: #888;
          --light-gray: #dedede;
          --lighter-gray: #f5f5f5;
          --article-color: #212121;
          --header-bg: rgba(255, 255, 255, 0.8);
          --gray-alpha: rgba(19, 20, 21, 0.3);
          --selection: rgba(0, 0, 0, 0.99);

          --token: #494949;
          --comment: #666;
          --name: #333;
        }

        * {
          box-sizing: border-box;
        }

        ::selection {
          background: var(--selection);
          color: var(--bg);
        }

        html {
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          line-height: 1.5;
        }

        html,
        body {
          padding: 0;
          margin: 0;
          font-size: 16px;
          background: var(--bg);
          color: var(--fg);
        }

        body {
          scroll-behavior: smooth;
          min-height: 100vh;
          font-family: var(--font-sans);
          display: flex;
          flex-direction: column;
          transition: color 0.1s ease-in-out, background 0.1s ease-in-out;
        }

        svg {
          transition: fill 0.1s ease-in-out, stroke 0.1s ease-in-out;
        }

        p,
        li {
          letter-spacing: 0.068px;
          font-size: 1.25rem;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: var(--font-sans);
          font-weight: 700;
          line-height: 1.25;
        }

        h1 {
          font-size: 2.5rem;
          font-weight: bold;
        }

        h2 {
          font-size: 2rem;
        }

        hr {
          border: none;
          border-bottom: 1px solid var(--light-gray);
          transition: border-color 0.1s ease-in-out;
        }

        blockquote {
          font-style: italic;
          margin: 0;
          padding-left: 1rem;
          border-left: 3px solid var(--light-gray);
          transition: border-color var(--transition);
        }

        button {
          border: none;
          padding: 0;
          margin: 0;
          line-height: inherit;
          font-size: inherit;
        }

        article {
          max-width: var(--main-content);
          margin: 0 auto;
          line-height: 1.9;
        }

        article > * + * {
          margin-top: 2em;
        }

        article p {
          color: var(--article-color);
          transition: color var(--transition);
        }s

        p a,
        a.reset {
          outline: none;
          color: inherit;
          text-decoration: none;
          transition: color var(--transition);
        }

        p a:hover,
        p a:focus,
        p a:active,
        a.reset:hover,
        a.reset:focus {
          color: var(--gray);
        }

        article *:not(pre) code {
          font-weight: 600;
          font-family: var(--font-sans);
          font-size: 1rem;
          padding: 0 3px;
        }

        article *:not(pre) code::before,
        article *:not(pre) code::after {
          content: '\`';
          color: var(--gray);
          user-select: none;
        }

        article pre {
          overflow-x: auto;
          background: var(--lighter-gray);
          border-radius: var(--inline-radius);
          padding: 1rem;
        }

        article img {
          max-width: 100%;
          width: var(--main-content);
        }
      `}</style>

      {/* Syntax highlighting */}
      <style jsx global>{`
        .token {
          color: var(--token);
        }
        .token.comment {
          color: var(--comment);
        }
        .token.string,
        .token.number,
        .token.builtin,
        .token.variable {
          color: var(--fg);
        }
        .token.class-name,
        .token.function,
        .token.tag,
        .token.attr-name {
          color: var(--name);
        }
      `}</style>

      <style jsx global>{`
        /* Links */
        .l-h {
          font-weight: 500;
          color: var(--gray);
          padding: var(--gap-quarter) var(--gap);
          border-radius: var(--radius);
          background: transparent;
          text-decoration: none;

          transition: color var(--transition),
            background-color var(--transition);
        }

        .l-h + .l-h,
        .l-h + .l-t {
          margin-left: var(--gap-half);
        }

        .l-h:hover,
        .l-h:focus,
        .l-h.active {
          outline: none;
          background: var(--color);
          color: #fff;
        }

        .l-i {
          padding: var(--gap-quarter) var(--gap-half);
          border-radius: var(--inline-radius);
          font-weight: 500;
          background-color: var(--lighter-gray);
          transition: color var(--transition),
            background-color var(--transition);
        }

        .l-i:hover,
        .l-i:focus {
          outline: none;
          background: var(--color);
          color: #fff;
        }

        .l-t {
          display: flex;
          align-items: center;
          font-weight: 500;
          color: var(--gray);
          padding: var(--gap-quarter) var(--gap);
          border-radius: var(--radius);
          background: transparent;
          text-decoration: none;
          text-transform: capitalize;

          transition: color var(--transition),
            background-color var(--transition);
        }

        .l-t + .l-t {
          margin-left: var(--gap-half);
        }

        .l-t::before {
          //content: '';
          border-radius: 50%;
          height: 10px;
          width: 10px;
          background: var(--color);
          margin-right: var(--gap-half);
          transition: background-color var(--transition);
        }

        .l-t:hover,
        .l-t:focus,
        .l-t.active {
          outline: none;
          background: var(--color);
          color: #fff;
        }

        .l-t:hover::before,
        .l-t:focus::before,
        .l-t.active::before {
          background: #fff;
        }

        .blue {
          --color: var(--blue);
        }

        .purple {
          --color: var(--purple);
        }

        .red {
          --color: var(--red);
        }

        .pink {
          --color: var(--pink);
        }

        .teal {
          --color: var(--teal);
        }

        .green {
          --color: var(--green);
        }

        .orange {
          --color: var(--orange);
        }

        .indigo {
          --color: var(--indigo);
        }

        .blue-gray {
          --color: var(--blue-gray);
        }

        .invert {
          --color: var(--fg);
        }

        .invert:hover,
        .invert:focus,
        .invert.active {
          color: var(--bg);
        }

        .clamp {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }

        .flex {
          display: flex;
        }
      `}</style>

      <style jsx>{`
        div {
          height: 100%;
          padding-bottom: var(--big-gap);
        }
        main {
          max-width: var(--main-content);
          margin: 0 auto;
          padding: 0 var(--gap);
        }
      `}</style>
    </div>
  )
}

export default Page
