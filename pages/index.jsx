import React from 'react';
import Link from 'next/link';

import Projects from '../components/Projects';
import Footer from '../components/Footer';

export default () => (
  <div className="wrapper">
    <div className="intro">
      <div className="title">
        <h1>Web developer at</h1>
        <h1>the intersection of</h1>
        <h1>design and code.</h1>
      </div>

      <div className="paragraph">
        <div>
          <p>
            Hello, I&apos;m Paco Coursey. I enjoy writing JavaScript and working on
            {' '}
            <b>open-source projects</b>
            . I&apos;m looking for an
            {' '}
            <b>internship</b>
            .
          </p>

          <Link href="/about" prefetch>
            <a>
              About Me
              <i>&#x2192;</i>
            </a>
          </Link>
        </div>

        <div>
          <p>
            I&apos;m a senior
            {' '}
            <b>Computer Science</b>
            {' '}
            student at New Mexico Tech. My web skills are
            {' '}
            <b>self-taught</b>
            , and I&apos;m always learning.
          </p>

          <Link href="/projects" prefetch>
            <a>
              My Blog
              <i>&#x2192;</i>
            </a>
          </Link>
        </div>
      </div>
    </div>

    <section>
      <Projects />
      <Footer />
    </section>

    <style jsx>
      {`
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .intro {
        height: 100vh;
        min-height: 800px;
        width: 100%;
      }

      .wrapper {
        max-width: 50rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .title {
        margin-bottom: 50px;
      }

      .title h1 {
        margin: 0 0 20px 0;
        opacity: 0;
        font-weight: 800;
        font-size: 5rem;
        line-height: 0.75;
        animation: fadeUp 500ms 0.5s ease-in-out forwards;
      }

      .paragraph {
        flex: 1;
        opacity: 0;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        animation: fadeIn 500ms 0.7s ease-in-out forwards;
      }

      .paragraph p {
        font-size: 1.15rem;
        margin-right: 50px;
        max-width: 350px;
        line-height: 1.4;
        letter-spacing: -0.27px;
      }

      @media screen and (max-width: 950px) {
        .title h1 {
          font-size: 6vw;
        }

        .paragraph {
          flex-direction: column;
          align-items: flex-start;
        }

        .paragraph p {
          max-width: 60vw;
        }

        .paragraph div {
          margin-bottom: 3rem;
        }
      }
      `}
    </style>
  </div>
);
