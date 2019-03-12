import React from 'react';
import Link from 'next/link';

export default () => (
  <div className="wrapper">
    <div className="intro">
      <div className="title">
        <h1>Hi, I&apos;m Paco.</h1>
      </div>

      <p>
        I&apos;m a 20 year old Computer Science student at
        {' '}
        <a href="http://nmt.edu" className="inline">New Mexico Tech</a>
        . I&apos;m a web developer comfortable with both front-end and back-end, and I enjoy designing rich visual interactions.
      </p>

      <p>
        I learn best through side projects (found on my
        {' '}
        <a href="https://github.com/pacocoursey" className="inline">
          GitHub
        </a>
        ), and I&apos;m always working on something new. Want to build something together? Get in touch down below.
      </p>

      <p>
        Minimalism, mechanical keyboards, and music are some of my biggest interests. I repost music I enjoy on my
        {' '}
        <a href="https://soundcloud.com/pxco" className="inline">SoundCloud</a>
        , share pictures of beautiful keyboards on my
        {' '}
        <a href="https://twitter.com/pacocoursey" className="inline">Twitter</a>
        , and share thoughts on my
        {' '}
        <Link href="/blog" prefetch>
          <a className="inline">
            blog
          </a>
        </Link>
        .
      </p>

      <p>
        Have something you want to share? Don&apos;t hesitate to get in touch.
      </p>

      <div className="contact">
        <a href="mailto:p@paco.im" className="inline">
          p@paco.im
        </a>
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

      .wrapper {
        max-width: 40rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .intro {
        height: 100vh;
        min-height: 800px;
        margin-top: 5rem;
      }

      .title {
        margin-bottom: 50px;
      }

      .title h1 {
        margin: 0 0 20px 0;
        opacity: 0;
        font-weight: 800;
        font-size: 5rem;
        letter-spacing: -1.78px;
        animation: fadeUp 500ms 0.5s ease-in-out forwards;
      }

      p {
        opacity: 0;
        font-size: 1.15rem;
        line-height: 1.7;
        animation: fadeUp 500ms 0.7s ease-in-out forwards;
      }

      .links {
        margin-top: 5rem;
      }

      .links h1 {
        font-size: 3rem;
        letter-spacing: -1.43px;
      }

      .contact {
        margin: 3rem 1rem;
        opacity: 0;
        font-size: 1.5rem;

        animation: fadeUp 500ms 0.7s ease-in-out forwards;
      }

      .contact div {
        cursor: pointer;
      }
      `}
    </style>
  </div>
);
