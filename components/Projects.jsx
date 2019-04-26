import React from 'react';

import Link from './Link';
import Image from './Image';

export default () => (
  <div>
    <div className="project">
      <div className="info">
        <div className="info-left">
          <h1>
            <Link href="https://github.com/pacocoursey/opus" inline bold tab>
              Opus
            </Link>
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
        <Image
          src="/static/img/opus.png"
          alt="Opus Screenshot"
          height={418}
          width={800}
        />
      </div>
    </div>

    <div className="project">
      <div className="info">
        <div className="info-left">
          <h1>
            <Link href="https://github.com/pacocoursey/dusk" inline bold tab>
              Dusk
            </Link>
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

      <div className="img">
        <a href="https://dusk.now.sh" target="_blank" rel="noopener noreferrer">
          <Image
            src="/static/img/dusk.png"
            alt="Dusk Screenshot"
            height={467}
            width={800}
          />
        </a>
      </div>
    </div>

    <div className="project">
      <div className="info">
        <div className="info-left">
          <h1>
            <Link href="https://github.com/pacocoursey/f2prs" inline bold tab>
              F2PRS
            </Link>
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

      <div className="img">
        <a href="http://f2prs.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="/static/img/f2prs.png"
            alt="F2PRS Screenshot"
            height={397}
            width={800}
          />
        </a>
      </div>
    </div>

    <div className="project">
      <div className="info">
        <div className="info-left">
          <h1>
            <Link href="https://github.com/pacocoursey/xi" inline bold tab>
              Xi
            </Link>
          </h1>
          <p>Minimal monochrome UI theme for Atom.</p>
        </div>

        <div className="info-right">
          <div className="eyebrow">Stack</div>
          <p>LESS</p>
        </div>
      </div>

      <div className="img">
        <a href="https://atom.io/packages/xi-ui" target="_blank" rel="noopener noreferrer">
          <Image
            src="/static/img/xi.png"
            alt="Xi Screenshot"
            height={419}
            width={800}
          />
        </a>
      </div>
    </div>

    <div className="project">
      <div className="info">
        <div className="info-left">
          <h1>
            <Link href="https://github.com/pacocoursey/paco" inline bold tab>
              paco.im
            </Link>
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
        <Image
          src="/static/img/paco.png"
          alt="paco.im Screenshot"
          height={519}
          width={800}
        />
      </div>
    </div>

    <div className="project">
      <div className="info">
        <div className="info-left">
          <h1>
            <Link href="https://github.com/pacocoursey/ehp-rs" inline bold tab>
              EHP
            </Link>
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

      <div className="img">
        <a href="https://ehp.now.sh" target="_blank" rel="noopener noreferrer">
          <Image
            src="/static/img/ehp.png"
            alt="EHP Website Screenshot"
            height={463}
            width={800}
          />
        </a>
      </div>
    </div>

    <div className="project">
      <div className="info">
        <div className="info-left">
          <h1>
            <Link href="https://github.com/pacocoursey/songbird" inline bold tab>
              Songbird
            </Link>
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

      <div className="img">
        <a href="https://songbird-2.now.sh" target="_blank" rel="noopener noreferrer">
          <Image
            src="/static/img/songbird.png"
            alt="Songbird Healing Studios Website Screenshot"
            height={482}
            width={800}
          />
        </a>
      </div>
    </div>

    <footer>
      <h1>
        <Link href="/about" prefetch bold inline>
          Let&apos;s chat.
        </Link>
      </h1>
    </footer>

    <style jsx>
      {`
      .img {
        width: 100%;
        margin: 50px 0;
        border-radius: 10px;
        overflow: hidden;

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
          font-size: 3rem;
        }

        .info-left {
          flex: 1;
        }

        .info-right {
          margin-top: 2rem;
          flex: 1;
          padding: 0;
          align-items: flex-end;
          text-align: right;
          justify-content: flex-start;
        }

        .info-right p {
          margin-top: 2rem;
        }
      }
      `}
    </style>
  </div>
);
