import React from 'react';
import Link from 'next/link';

export default () => (
  <div className="list">
    <h1 className="title">Blog</h1>

    <div className="post">
      <span>March 14, 2019</span>
      <h1>
        <Link href="/blog/understanding-package-json" prefetch>
          <a className="inline">
            Understanding package.json
          </a>
        </Link>
      </h1>
      <p>The hidden environment of Node.</p>
    </div>

    <div className="post">
      <span>March 19, 2019</span>
      <h1>
        <a href="#" className="inline">
          Custom Emojis
        </a>
      </h1>
      <p>A simple CSS trick to color emojis.</p>
    </div>

    <div className="post">
      <span>March 14, 2019</span>
      <h1>
        <a href="#" className="inline">
          Understanding package.json
        </a>
      </h1>
      <p>The hidden environment of Node.</p>
    </div>

    <div className="post">
      <span>March 19, 2019</span>
      <h1>
        <a href="#" className="inline">
          Custom Emojis
        </a>
      </h1>
      <p>A simple CSS trick to color emojis.</p>
    </div>

    <div className="post">
      <span>March 14, 2019</span>
      <h1>
        <a href="#" className="inline">
          Understanding package.json
        </a>
      </h1>
      <p>The hidden environment of Node.</p>
    </div>

    <div className="post">
      <span>March 19, 2019</span>
      <h1>
        <a href="#" className="inline">
          Custom Emojis
        </a>
      </h1>
      <p>A simple CSS trick to color emojis.</p>
    </div>

    <div className="post">
      <span>March 14, 2019</span>
      <h1>
        <a href="#" className="inline">
          Understanding package.json
        </a>
      </h1>
      <p>The hidden environment of Node.</p>
    </div>

    <div className="post">
      <span>March 19, 2019</span>
      <h1>
        <a href="#" className="inline">
          Custom Emojis
        </a>
      </h1>
      <p>A simple CSS trick to color emojis.</p>
    </div>

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

          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 50rem;
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
      `}
    </style>
  </div>
);
