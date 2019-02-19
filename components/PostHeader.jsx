import React from 'react';

export default ({ children, date }) => (
  <header>
    <h1>{children}</h1>
    <p>{date}</p>

    <style jsx>
      {`
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      header {
        opacity: 0;
        margin: 2rem 0;
        animation: fadeUp 500ms 0.5 ease-in-out forwards !important;
      }

      header h1 {
        color: inherit;
        margin-bottom: 0.5rem;
      }

      header p {
        margin: 0;
        color: var(--gray);
        font-size: 1rem;
      }
      `}
    </style>
  </header>
);
