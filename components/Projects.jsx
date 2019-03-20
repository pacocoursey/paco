import React from 'react';
import { SimpleImg, initSimpleImg } from 'react-simple-img';
import Link from 'next/link';

const Image = ({ src, alt }) => (
  <SimpleImg
    width="100%"
    height="auto"
    src={src}
    alt={alt}
    placeholder="var(--light-gray)"
    animationDuration="2"
    importance="high"
  />
);

class Projects extends React.Component {
  componentDidMount() {
    initSimpleImg({
      rootMargin: '0px 0px 200px 0px',
    });
  }

  render() {
    return (
      <div>
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
              <div className="eyebrow">Stack</div>
              <p>
                ES6
                <br />
                Node.js
                <br />
                CSS
                <br />
                Electron
              </p>
            </div>
          </div>

          <div className="img">
            <Image src="/static/img/opus.png" alt="Opus Screenshot" />
          </div>
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
              <div className="eyebrow">Stack</div>
              <p>
                React / Next.js
                <br />
                styled-components
                <br />
                Node.js
                <br />
                SVG
                <br />
                Now
              </p>
            </div>
          </div>

          <a href="https://dusk.now.sh" target="_blank" rel="noopener noreferrer">
            <div className="img">
              <Image src="/static/img/dusk.png" alt="Dusk Screenshot" />
            </div>
          </a>
        </div>

        <div className="project">
          <div className="info">
            <div className="info-left">
              <h1>
                <a href="https://github.com/pacocoursey/f2prs" className="inline">
                  F2PRS
                </a>
              </h1>
              <p>Accurate F2P tracking and hiscores for the online game RuneScape.</p>
            </div>

            <div className="info-right">
              <div className="eyebrow">Stack</div>
              <p>
                PHP
                <br />
                MySQL
                <br />
                AJAX
              </p>
            </div>
          </div>

          <a href="http://f2prs.com" target="_blank" rel="noopener noreferrer">
            <div className="img">
              <Image src="/static/img/f2prs.png" alt="F2PRS Screenshot" />
            </div>
          </a>
        </div>

        <div className="project">
          <div className="info">
            <div className="info-left">
              <h1>
                <a href="https://github.com/pacocoursey/xi" className="inline" target="_blank" rel="noopener noreferrer">
                  Xi
                </a>
              </h1>
              <p>Minimal monochrome UI theme for Atom.</p>
            </div>

            <div className="info-right">
              <div className="eyebrow">Stack</div>
              <p>LESS</p>
            </div>
          </div>

          <a href="https://atom.io/packages/xi-ui" target="_blank" rel="noopener noreferrer">
            <div className="img">
              <Image src="/static/img/xi.png" alt="Xi Screenshot" />
            </div>
          </a>
        </div>

        <div className="project">
          <div className="info">
            <div className="info-left">
              <h1>
                <a href="https://github.com/pacocoursey/paco" className="inline">
                  paco.im
                </a>
              </h1>
              <p>Personal website and blog.</p>
            </div>

            <div className="info-right">
              <div className="eyebrow">Stack</div>
              <p>
                React / Next.js
                <br />
                styled-jsx
                <br />
                Figma
              </p>
            </div>
          </div>

          <div className="img">
            <Image src="/static/img/paco.png" alt="paco.im Screenshot" />
          </div>
        </div>

        <div className="project">
          <div className="info">
            <div className="info-left">
              <h1>
                <a href="https://github.com/pacocoursey/ehp-rs" className="inline">
                  EHP
                </a>
              </h1>
              <p>Design and website for the RuneScape clan EHP.</p>
            </div>

            <div className="info-right">
              <div className="eyebrow">Stack</div>
              <p>
                React / Next.js
                <br />
                styled-components
                <br />
                Node.js
                <br />
                Now v2
              </p>
            </div>
          </div>

          <a href="https://ehp.now.sh" target="_blank" rel="noopener noreferrer">
            <div className="img">
              <Image src="/static/img/ehp.png" alt="EHP Website Screenshot" />
            </div>
          </a>
        </div>

        <div className="project">
          <div className="info">
            <div className="info-left">
              <h1>
                <a href="https://github.com/pacocoursey/songbird" className="inline">
                  Songbird
                </a>
              </h1>
              <p>Design and website for Songbird Healing Studio.</p>
            </div>

            <div className="info-right">
              <div className="eyebrow">Stack</div>
              <p>
                HTML / CSS
                <br />
                PostHTML
                <br />
                Parcel
              </p>
            </div>
          </div>

          <a href="https://songbird-2.now.sh" target="_blank" rel="noopener noreferrer">
            <div className="img">
              <Image src="/static/img/songbird.png" alt="Songbird Healing Studios Website Screenshot" />
            </div>
          </a>
        </div>

        <footer>
          <h1>
            <Link href="/about" prefetch>
              <a className="inline">
                Let&apos;s chat.
              </a>
            </Link>
          </h1>
        </footer>

        <style jsx>
          {`
          .img {
            margin: 50px 0;
            border-radius: 10px;
            overflow: hidden;

            width: 100%;


            background-color: var(--light-gray);

            filter: grayscale(1);
            border: 1px solid var(--light-gray);
            box-shadow: var(--big-shadow);
            transition: filter 300ms ease-in-out, box-shadow 300ms ease-in-out, border 300ms ease-in-out, transform 300ms ease-in-out;
          }

          .img:hover {
            filter: none;
            transform: scale(1.01);
            transition: filter 300ms ease-in-out, transform 300ms ease-in-out;
          }

          .project {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            width: 100%;
            margin-bottom: 300px;
          }

          .info h1 {
            font-size: 5rem;
            letter-spacing: -0.055em;
            margin: 0;
          }

          /* Fixes the text clip issue when using gradient background */
          .info h1 a::after {
            content: "\00a0";
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
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
          }

          .info-right p {
            font-size: 1rem;
            color: var(--color);
            text-align: right;
            transition: color 300ms ease-in-out;
          }

          .eyebrow {
            text-transform: uppercase;
            color: var(--gray);
            font-weight: normal;
          }

          footer {
            margin-bottom: 10rem;
          }

          footer h1 {
            text-align: center;
            font-size: 5rem;
          }

          @media screen and (max-width: 950px) {
            footer h1,
            .info h1 {
              font-size: 6vw;
            }

            .info {
              flex-direction: column;
            }

            .info-right {
              margin-top: 2rem;
              padding: 0;
              align-items: flex-start;
            }

            .info-right p {
              text-align: left;
            }
          }
          `}
        </style>
      </div>
    );
  }
}

export default Projects;
