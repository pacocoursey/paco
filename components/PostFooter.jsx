import React from 'react';

export default ({ children }) => (
  <footer>
    <hr />

    <div className="footnotes">
      {children}
    </div>

    <style jsx>
      {`
      .footnotes {
        counter-reset: footnote;
        font-size: 1rem;
      }

      .footnotes :global(p::before) {
        margin-right: 10px;
        counter-increment: footnote;
        content: counters(footnote, ".") " ";
      }
      `}
    </style>
  </footer>
);
