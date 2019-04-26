import React from 'react';

import Link from '../components/Link';
import Wrapper from '../components/Wrapper';
import Projects from '../components/Projects';
import Footer from '../components/Footer';

export default () => (
  <Wrapper>
    <div className="intro">
      <div className="title">
        <h1>Web developer at</h1>
        <h1>the intersection of</h1>
        <h1>design and code.</h1>
      </div>

      <div className="paragraph">
        <div>
          <p>
            Hello, I&apos;m Paco Coursey. I enjoy writing JavaScript and working on open-source projects.
          </p>

          <Link href="/about" prefetch inline bold>
            About Me
          </Link>
        </div>

        <div>
          <p>
            I&apos;m a senior Computer Science student at New Mexico Tech. My web skills are self-taught, and I&apos;m always learning.
          </p>

          <Link href="/blog" prefetch inline bold>
            My Blog
          </Link>
        </div>
      </div>
    </div>

    <div className="projects">
      <Projects />
      <Footer />
    </div>

    <style jsx>
      {`
      .intro {
        min-height: 80vh;
        min-height: 800px;
      }

      .projects {
        width: 100%;
      }

      .title {
        margin-bottom: 50px;
      }

      .title h1 {
        margin: 0 0 20px 0;
        font-weight: 800;
        font-size: 5rem;
        line-height: 0.75;
        letter-spacing: -1.78px;
      }

      .paragraph {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }

      .paragraph > div {
        flex: 1;
      }

      .paragraph p {
        font-size: 1.15rem;
        margin-right: 50px;
        max-width: 350px;
        line-height: 1.7;
        letter-spacing: -0.27px;
      }

      @media screen and (max-width: 950px) {
        .title h1 {
          font-size: 9vw;
          letter-spacing: -0.3vw;
          text-align: center;
        }

        .wrapper {
          width: 100%;
        }

        .paragraph {
          align-items: flex-start;
        }

        .paragraph > div:first-child {
          margin-right: 20px;
        }

        .paragraph p {
          margin-right: 0;
          max-width: 400px;
        }

        .paragraph div {
          margin-bottom: 3rem;
        }
      }

      @media screen and (max-width: 425px) {
        .paragraph {
          flex-direction: column;
        }
      }
      `}
    </style>
  </Wrapper>
);
