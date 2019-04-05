import React from 'react';
import { SimpleImg } from 'react-simple-img';

export default ({
  src, alt, height, width, caption,
}) => (
  <figure>
    <SimpleImg
      src={src}
      alt={alt}
      height={height || 'auto'}
      width={width || '100%'}
      placeholder="var(--lighter-gray)"
      animationDuration="2"
      applyAspectRatio
    />

    {caption ? <figcaption>{caption}</figcaption> : ''}

    <style jsx>
      {`
        figure {
          margin: 0;
        }

        figcaption {
          text-align: center;
          margin-top: 2rem;
          color: var(--gray);
          font-size: 0.9rem;
        }
      `}
    </style>
  </figure>
);
