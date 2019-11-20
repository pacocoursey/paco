import Head from 'next/head'

import Page from './page'
import Link from './link'

const Error = ({ status }) => {
  return (
    <Page title={status || 'Error'}>
      <Head>
        <title>404 — Paco Coursey</title>
      </Head>

      {status === 404 ? (
        <>
          <h1>This page cannot be found.</h1>

          <p>
            <blockquote cite="http://www.aaronsw.com/weblog/visitingmit">
              <p>
                It doesn’t exist, it never has. I’m nostalgic for a place that
                never existed.
              </p>

              <footer>
                — Aaron Swartz,{' '}
                <Link external href="http://www.aaronsw.com/weblog/visitingmit">
                  <cite>I Love the University</cite>
                </Link>
              </footer>
            </blockquote>
          </p>
        </>
      ) : (
        <section>
          <span>{status || '?'}</span>
          <p>An error occurred.</p>
        </section>
      )}

      <style jsx>{`
        section {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--light-gray);
        }

        span {
          font-size: 16rem;
          margin: 0;
          line-height: normal;
          font-weight: bold;
        }
      `}</style>
    </Page>
  )
}

export default Error
