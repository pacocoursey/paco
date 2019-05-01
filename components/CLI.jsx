import React from 'react';

export default ({ children }) => (
  <pre>
    {React.Children.map(children, child => (
      <span>
        <span>$&nbsp;</span>
        {child}
        <br />
      </span>
    ))}

    <style jsx>
      {`
      pre {
        background-color: var(--lighter-gray);
        border-radius: 3px;
        padding: 5px 10px;
        font-family: var(--monospace);
        font-size: 1rem;
        white-space: pre-wrap;
        transition: background 300ms ease-in-out;
      }

      span > span {
        color: var(--gray);
        user-select: none;

        transition: color 300ms ease-in-out;
      }
      `}
    </style>
  </pre>
);
