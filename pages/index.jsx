import React from 'react';
import Link from 'next/link';

export default () => (
  <div className="section">
    <div className="intro">
      <div className="title">
        <h1>Web developer at the intersection of design and code.</h1>
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

          <Link href="/about">
            <a>
              Hire Me
              <i>&#x27f6;</i>
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

          <Link href="/projects">
            <a>
              My Projects
              <i className="down">&#x02193;</i>
            </a>
          </Link>
        </div>
      </div>
    </div>

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

      .section {
        max-width: 50rem;
        padding-top: 100px;
      }

      .intro {
        dislpay: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }

      .title {
        margin-bottom: 50px;
      }

      .title h6 {
        margin: 0;
        opacity: 0;
        font-size: 2vw;
        text-transform: uppercase;
        font-weight: lighter;
        letter-spacing: 2px;
        animation: fadeUp 500ms 0.5s ease-in-out forwards;
      }

      .title h1 {
        margin: 0 0 20px 0;
        opacity: 0;
        font-weight: 800;
        font-size: 5rem;
        line-height: 1;
        animation: fadeUp 500ms 0.6s ease-in-out forwards;
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

      a i {
        margin-left: 5px;
        font-style: normal;
        display: inline-block;
        transition: transform 300ms ease-in-out;
      }

      a:hover i.down {
        transform: translateY(10px);
        transition: transform 300ms ease-in-out;
      }

      a:hover i {
        transform: translateX(10px);
        transition: transform 300ms ease-in-out;
      }
      `}
    </style>
  </div>
);
