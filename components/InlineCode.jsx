import React from 'react';

export default ({ children }) => (
  <code>
    {children}

    <style jsx>
      {`
        code {
          font-size: 1rem;
          padding: 2px 0.25rem;
          font-family: var(--monospace);
          background-color: var(--lighter-gray);
          border-radius: 2px;
          transition: background 300ms ease-in-out;
        }
      `}
    </style>
  </code>
);
