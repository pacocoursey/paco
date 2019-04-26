import React from 'react';

export default ({ children }) => (
  <pre>
    <span>$&nbsp;</span>
    {children}

    <style jsx>
      {`
      pre {
        background-color: var(--lighter-gray);
        border-radius: 3px;
        padding: 5px 10px;
        font-family: var(--monospace);
        font-size: 0.9rem;
        white-space: pre-wrap;
        transition: background 300ms ease-in-out;
      }

      span {
        color: var(--gray);
        user-select: none;

        transition: color 300ms ease-in-out;
      }
      `}
    </style>
  </pre>
);
