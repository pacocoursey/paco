import React from 'react';
import Link from 'next/link';

export default () => (
  <div className="wrapper">
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

          <Link href="/projects">
            <a>
              My Blog
              <i>&#x2192;</i>
            </a>
          </Link>
        </div>
      </div>
    </div>

    <section>
      <div className="project">
        <div className="info">
          <div className="info-left">
            <h1>
              <a href="https://github.com/pacocoursey/opus" className="inline">
                Opus
              </a>
            </h1>
            <p>Minimal note-taking application developed for my lecture notes.</p>
          </div>

          <div className="info-right">
            <div className="eyebrow">Using</div>
            <p>
              ES6 JavaScript
              <br />
              Electron
              <br />
              Node.js
            </p>
          </div>
        </div>

        <img src="/static/img/opus.png" alt="Opus Screenshot" />
      </div>

      <div className="project">
        <div className="info">
          <div className="info-left">
            <h1>
              <a href="https://github.com/pacocoursey/dusk" className="inline">
                Dusk
              </a>
            </h1>
            <p>Collection of simple, customizable replacement macOS application icons.</p>
          </div>

          <div className="info-right">
            <div className="eyebrow">Using</div>
            <p>
              React / Next.js
              <br />
              styled-components
              <br />
              Node.js CLI
              <br />
              SVG
              <br />
              Now
            </p>
          </div>
        </div>

        <img src="https://pbs.twimg.com/media/DsRO-tnUcAAiKGu.png" alt="Dusk Screenshot" />
      </div>
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
        max-width: 50rem;
      }

      section img {
        margin: 50px 0;
        width: 100%;
        height: auto;
        border-radius: 10px;
        overflow: hidden;
        filter: grayscale(1);
      }

      .project {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        margin-bottom: 300px;
      }

      .info h1 {
        font-size: 5rem;
        margin: 0;
      }

      .info p {
        color: var(--gray);
        font-size: 1.25rem;
        line-height: 1.7;
        max-width: 30rem;
      }

      .info {
        width: 100%;
        display: flex;
        flex-direction: row;
      }

      .info-left {
        flex: 1;
      }

      .info-left p {
        max-width: 25rem;
      }

      .info-right {
        padding-left: 100px;
      }

      .info-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
      }

      .info-right p {
        font-size: 1rem;
        color: var(--color);
        text-align: right;
      }

      .eyebrow {
        text-transform: uppercase;
        color: var(--gray);
        font-weight: normal;
      }

      .wrapper {
        max-width: 50rem;
        padding-top: 100px;
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
        opacity: 0;
        margin-left: 5px;
        font-style: normal;
        display: inline-block;
        transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;
      }

      a:hover i {
        opacity: 1;
        transform: translateX(30px);
        transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;
      }
      `}
    </style>
  </div>
);
