import React from 'react';
import Link from 'next/link';

export default ({
  href,
  tab,
  inline = true,
  prefetch,
  bold,
  block,
  children,
}) => (
  <Link href={href} prefetch={prefetch}>
    <a
      target={tab ? '_blank' : '_self'}
      {...(tab && { rel: 'noreferrer noopener' })}
    >
      {!block ? <span>{children}</span> : <div>{children}</div>}

      <style jsx>
        {`
        span {
          ${inline ? `
            width: calc(100%);
            height: 100%;

            background-image: linear-gradient(var(--light-gray), var(--light-gray));
            background-repeat: no-repeat;
            background-position: bottom;
            background-size: 100% 20%;
            transition: background-size 150ms ease-out;
          ` : ''}

          font-weight: ${bold ? 'bold' : '600'};
        }

        span:hover {
          ${inline ? `
            background-size: 100% 100%;
            transition: background-size 150ms ease-in;
          ` : ''}
        }
        `}
      </style>

      <style jsx global>
        {`
          a {
            color: inherit;
            text-decoration: none;
          }
        `}
      </style>
    </a>
  </Link>
);
