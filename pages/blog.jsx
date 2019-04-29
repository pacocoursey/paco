import React from 'react';
import Head from 'next/head';

import Cover from '../components/Cover';
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
              {<Cover id={post.cover} />}
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

          border-radius: 5px;

          border: 1px solid var(--light-gray);

          margin-bottom: 3rem;

          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;

          transition: transform 150ms ease-in-out, background 300ms ease-in-out, border 300ms ease-in-out;
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
          overflow: hidden;
          border-bottom: 1px solid var(--light-gray);
          border-radius: 0 0 5px 5px;

          transition: border 300ms ease-in-out;
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
