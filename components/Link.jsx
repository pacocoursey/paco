import React from 'react';
import Link from 'next/link';

export default ({ href, tab = false, inline = false, children }) => (
  <Link href={href}>
    <a
      target={tab ? '_blank' : '_self'}
      {...(tab && { rel: 'noreferrer noopener' })}
    >
      <span>{children}</span>

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
            transition: background-size 150ms ease-in-out, background-color 150ms ease-in-out;
          ` : ''}
        }

        span:hover {
          ${inline ? `
            background-size: 100% 100%;
          ` : ''}
        }
        `}
      </style>
    </a>
  </Link>
);
