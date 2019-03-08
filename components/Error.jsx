import React from 'react';

const Error = ({ code }) => (
  <div className="error">
    <div className="number">
      <span>4</span>
      <div className="circle" />
      <span>4</span>
    </div>

    <p>Page not found.</p>
    <style jsx>
      {`
      .error {
        max-width: 50rem;
        font-size: 1.5rem;

        flex: 1;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .number {
        font-weight: bold;
        font-size: 30vw;
        display: flex;
        align-items: center;
      }

      .circle {
        background-color: var(--color);
        border-radius: 50%;
        height: 25vw;
        width: 25vw;
      }
      `}
    </style>
  </div>
);

export default Error;
