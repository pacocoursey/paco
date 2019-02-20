import React from 'react';

export default ({ children }) => (
  <footer>
    <hr />

    <div className="footnotes">
      {children}
    </div>

    <style jsx>
      {`
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      footer {
        opacity: 0;
        animation: fadeUp 500ms 0.7s ease-in-out forwards;
      }

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
