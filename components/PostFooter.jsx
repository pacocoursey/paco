import React from 'react';

export default ({ children }) => (
  <footer>
    <hr />

    <div className="footnotes">
      <p>asdf</p>
      <p>asdfasdf</p>
      {children}
    </div>

    <style jsx>
      {`
      article footer {
        opacity: 0;
        animation: fadeUp 500ms 0.7 ease-in-out forwards;
      }

      .footnotes {
        counter-reset: footnote;
        font-size: 1rem;
      }

      .footnotes p::before {
        margin-right: 10px;
        counter-increment: footnote;
        content: counters(footnote, ".") " ";
      }
      `}
    </style>
  </footer>
);
