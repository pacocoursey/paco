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
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .intro {
        min-height: 80vh;
        min-height: 800px;
        margin-top: 5rem;
      }

      .projects {
        width: 100%;
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
        letter-spacing: -1.78px;
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
        line-height: 1.7;
        letter-spacing: -0.27px;
      }

      @media screen and (max-width: 950px) {
        .title {
          width: 70vw;
        }

        .title h1 {
          font-size: 6vw;
          letter-spacing: -0.2vw;
        }

        .wrapper {
          width: 100%;
        }

        .paragraph {
          flex-direction: column;
          align-items: flex-start;
        }

        .paragraph p {
          margin-right: 0;
          max-width: 400px;
        }

        .paragraph div {
          margin-bottom: 3rem;
        }
      }
      `}
    </style>
  </Wrapper>
);
