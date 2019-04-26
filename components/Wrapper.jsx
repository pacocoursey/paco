import React from 'react';

export default ({ children }) => (
  <div>
    {children}

    <style jsx>
      {`
        div {
          margin: 50px auto;

          max-width: 50rem;

          display: flex;
          flex-direction: column;
        }

        @media screen and (max-width: 950px) {
          div {
            padding: 0 20px;
          }
        }
      `}
    </style>
  </div>
);
