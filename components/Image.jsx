import React from 'react';

export default ({ src, alt, caption }) => (
  <figure>
    <img src={src} alt={alt} />
    {caption ? <figcaption>{caption}</figcaption> : ''}

    <style jsx>
      {`
        figure {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        figcaption {
          margin-top: 2rem;
          color: var(--gray);
          font-size: 0.9rem;
        }

        img {
          max-width: 100%;
          margin: 1rem 0;
        }
      `}
    </style>
  </figure>
);
