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

export default () => (
  <Wrapper>
    <Head>
      <title>Blog - Paco Coursey</title>
    </Head>

    <h1 className="title">Blog</h1>

    {posts.map(post => (
      <div className="post" key={post.title}>
        <span>{post.date}</span>
        <h1>
          <Link href={`/blog/${post.id}`} prefetch>
            {post.title}
          </Link>
        </h1>
        <p>{post.description}</p>
      </div>
    ))}

    <style jsx>
      {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .list {
          opacity: 0;
          animation: fadeIn 500ms 0.7s ease-in-out forwards;
        }

        .post {
          width: 100%;
          margin-bottom: 2rem;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--light-gray);

          transition: border 300ms ease-in-out;
        }

        .post:last-child {
          border-bottom: none;
        }

        .post h1 {
          margin-top: 0.5rem;
        }

        .post span {
          color: var(--gray);
          font-size: 0.8rem;
        }

        .post p {
          color: var(--gray);
        }

        .title {
          margin-bottom: 3rem;
          opacity: 0;
          animation: fadeUp 500ms 0.5s ease-in-out forwards;
        }

        @media screen and (max-width: 950px) {
          .post h1 {
            font-size: 1.25rem;
          }
        }
      `}
    </style>
  </Wrapper>
);
