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
          font-size: 1.25rem;
          letter-spacing: -0.022rem;
          line-height: 1.7;
          opacity: 0;
          animation: fadeIn 500ms 0.6s ease-in-out forwards;
        }
        `}
      </style>
    </article>
  </Page>
);
