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
      placeholder={false}
      animationDuration="0.3"
      applyAspectRatio
    />

    {caption ? <figcaption>{caption}</figcaption> : ''}

    <style jsx>
      {`
        figure {
          width: ${`${width}px` || 'unset'};
          height: ${`${height}px` || 'unset'};
          margin: 0;
          background-color: transparent;
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
