import React from 'react';
import Head from 'next/head';

import { Mail } from '../components/icons';
import Wrapper from '../components/Wrapper';
import Link from '../components/Link';

export default () => (
  <Wrapper>
    <Head>
      <title>About - Paco Coursey</title>
    </Head>

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
        <Link href="https://github.com/pacocoursey" tab>
          GitHub
        </Link>
        ), and I&apos;m always working on something new. Want to build something together? Get in touch down below.
      </p>

      <p>
        Minimalism, mechanical keyboards, and music are some of my biggest interests. I repost music I enjoy on my
        {' '}
        <Link href="https://soundcloud.com/pxco" tab>SoundCloud</Link>
        , share pictures of beautiful keyboards on my
        {' '}
        <Link href="https://twitter.com/pacocoursey" tab>Twitter</Link>
        , and share thoughts on my
        {' '}
        <Link href="/blog" prefetch>
          blog
        </Link>
        .
      </p>

      <p>
        Have something you want to share? Don&apos;t hesitate to get in touch.
      </p>

      <div className="contact">
        <Mail />
        <Link href="mailto:p@paco.im" bold prefetch={false}>
          p@paco.im
        </Link>
      </div>
    </div>

    <style jsx>
      {`
      .title {
        margin-bottom: 50px;
      }

      .title h1 {
        margin: 0 0 20px 0;
        font-weight: 800;
      }

      p {
        font-size: 1.15rem;
        line-height: 1.7;
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
        font-size: 1.5rem;

        display: flex;
        align-items: center;
      }

      .contact :global(svg) {
        margin-right: 1rem;
      }
      `}
    </style>
  </Wrapper>
);
