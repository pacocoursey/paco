import React from 'react';
import Head from 'next/head';

import Wrapper from '../components/Wrapper';
import Link from '../components/Link';
import posts from '../data/blog.json';

// Sort the posts so that newest post is first
posts.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);

  if (dateA < dateB) { return 1; }
  if (dateA > dateB) { return -1; }
  return 0;
});

const TestCover = () => (
  <svg width="1000" height="240" viewBox="0 0 1000 240" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1000" height="240" fill="var(--lighter-gray)"/>
    <circle cx="218" cy="120" r="35" fill="var(--light-gray)"/>
    <circle cx="312" cy="120" r="35" fill="var(--light-gray)"/>
    <circle cx="406" cy="120" r="35" fill="var(--light-gray)"/>
    <circle cx="500" cy="120" r="35" fill="var(--light-gray)"/>
    <circle cx="594" cy="120" r="35" fill="#FF3B30"/>
    <circle cx="688" cy="120" r="35" fill="var(--light-gray)"/>
    <circle cx="782" cy="120" r="35" fill="var(--light-gray)"/>
  </svg>
);

const Placeholder = () => (
<svg width="800" height="208" viewBox="0 0 800 208" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="208" fill="var(--lighter-gray)"/>
<rect x="82" y="81" width="42" height="16" rx="8" fill="var(--light-gray)"/>
<rect x="82" y="110" width="77" height="16" rx="8" fill="var(--light-gray)"/>
<rect x="82" y="139" width="163" height="16" rx="8" fill="var(--light-gray)"/>
<rect x="82" y="52" width="132" height="16" rx="8" fill="var(--light-gray)"/>
</svg>

);

const Cover = ({ id }) => {
  const covers = {
    'persistent-icons': TestCover,
    placeholder: Placeholder,
  };

  const Image = covers[id] || covers.placeholder;
  return <Image />;
};

export default () => (
  <Wrapper>
    <Head>
      <title>Blog - Paco Coursey</title>
    </Head>

    <div className="posts">
      {posts.map(post => (
        <Link href={`/blog/${post.id}`} prefetch inline={false} block key={post.title}>
          <div className="post">
            <div className="header">
              <h1>{post.title}</h1>
              <span>{post.date}</span>
            </div>
            <div className="image">
              {<Cover id={post.id} />}
            </div>
          </div>
        </Link>
      ))}
    </div>

    <style jsx>
      {`
        .posts {
          display: flex;
          flex-direction: column;
        }

        .post {
          height: 20rem;

          background: var(--lighter-gray);
          border-radius: 5px;

          margin-bottom: 2rem;

          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;

          transition: transform 150ms ease-in-out, background 300ms ease-in-out;
        }

        .post:hover {
          transform: scale(1.01);
        }

        .header {
          padding: 1rem 1.5rem;
          width: 100%;
        }

        .image {
          width: 100%;
          flex: 1;
          position: relative;
        }

        .image :global(svg) {
          width: 100%;
        }

        .image :global(svg *) {
          transition: fill 300ms ease-in-out;
        }

        .image :global(img) {
          height: 20%;
          width: 100%;
          object-fit: contain;
        }

        .post:last-child {
          border-bottom: none;
        }

        .header h1 {
          font-size: 2.25rem;
          letter-spacing: -0.5px;
          margin: 0.5rem 0;
        }

        .header span {
          color: var(--gray);
          font-size: 1rem;
        }

        @media screen and (max-width: 950px) {
          .post h1 {
            font-size: 1.5rem;
          }
        }
      `}
    </style>
  </Wrapper>
);
