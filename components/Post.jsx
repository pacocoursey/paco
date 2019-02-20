import React from 'react';

import Page from './Page';

export default ({ children, title }) => (
  <Page title={title}>
    <article>
      {children}

      <style jsx>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        article, article img {
          max-width: 42rem;
        }

        article {
          font-size: 1.15rem;
          letter-spacing: -0.022rem;
          line-height: 1.8;
          opacity: 0;
          animation: fadeIn 500ms 0.6s ease-in-out forwards;
        }

        article :global(p) {
          margin: 1.875rem 0;
        }

        article :global(header) {
          opacity: 0;
          margin: 2rem 0;
          animation: fadeUp 500ms 0.5s ease-in-out forwards;
        }

        article :global(header h1) {
          color: inherit;
          margin-bottom: 0.5rem;
        }

        article :global(header p) {
          margin: 0;
          color: var(--gray);
          font-size: 1rem;
        }
        `}
      </style>
    </article>
  </Page>
);
