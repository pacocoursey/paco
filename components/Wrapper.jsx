import React from 'react';

export default ({ children, mt }) => (
  <div>
    {children}

    <style jsx>
      {`
        div {
          margin: ${mt ? `${mt}rem` : '8rem'} auto;

          width: 100%;
          max-width: 50rem;

          display: flex;
          flex-direction: column;
        }

        @media screen and (max-width: 950px) {
          div {
            margin-top: 50px;
            padding: 0 20px;
          }
        }
      `}
    </style>
  </div>
);
