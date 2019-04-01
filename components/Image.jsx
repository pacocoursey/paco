import React from 'react';
import { SimpleImg } from 'react-simple-img';

export default ({
  src, alt, height, width, caption,
}) => (
  <div>
    <SimpleImg
      src={src}
      alt={alt}
      height={height || 'auto'}
      width={width || '100%'}
      placeholder="transparent"
      animationDuration="2"
    />

    {caption ? <span>{caption}</span> : ''}

    <style jsx>
      {`
        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        span {
          margin-top: 2rem;
          color: var(--gray);
          font-size: 0.9rem;
        }
      `}
    </style>
  </div>
);
