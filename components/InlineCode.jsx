import React from 'react';

export default ({ children }) => (
  <code>
    {children}

    <style jsx>
      {`
      code {
        padding: 0.25rem 0.25rem;
        font-family: var(--monospace);
        background-color: var(--light-gray);
        border-radius: 5px;
        transition: background 300ms ease-in-out;
      }
      `}
    </style>
  </code>
);
