import React from 'react';
import Link from 'next/link';

import {
  Logo,
  Blog,
  Toggle,
} from './icons';

export default ({ toggleTheme }) => (
  <div className="menu">
    <div className="top">
      <Link href="/">
        <div className="menu-item">
          <a className="logo">
            <Logo />
          </a>
        </div>
      </Link>

      <Link href="/blog">
        <div className="menu-item">
          <a
            className="blog"
            type="button"
          >
            <Blog />
          </a>
        </div>
      </Link>

      <button
        className="toggle menu-item"
        type="button"
        onClick={() => { toggleTheme(); }}
      >
        <Toggle />
      </button>
    </div>

    <div className="bottom">
      <a href="mailto:p@paco.im">p@paco.im</a>
    </div>

    <style jsx>
      {`
      .menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 30px 0;

        background-color: var(--bg);
        border-right: 1px solid var(--light-gray);
        border-bottom: 1px solid var(--light-gray);

        transition: border 300ms ease-in-out, background 300ms ease-in-out;
      }

      .top {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
      }

      .bottom {
        writing-mode: vertical-rl;
        transform: rotate(-180deg);
      }

      .menu-item {
        margin: 30px 0;
      }

      .toggle, .logo, .blog {
        cursor: pointer;
      }

      button {
        outline: none;
        padding: 0;
        cursor: pointer;
        background: transparent;
        border: none;
      }

      .logo :global(svg path),
      .blog :global(svg path),
      .toggle :global(svg path) {
        stroke: var(--color);
        fill: var(--bg);
        transition: fill 300ms ease-in-out, stroke 300ms ease-in-out;
      }

      .logo:hover :global(svg path),
      .blog:hover :global(svg path),
      .toggle:hover :global(svg path) {
        fill: var(--color);
        transiton: fill 300ms ease-in-out, stroke 300ms ease-in-out;
      }

      @media screen and (max-width: 950px) {
        .menu {
          flex-direction: row;
          justify-content: space-between;
          height: 100px;
          width: 100%;
          padding: 0 50px;
          background-color: var(--bg);
          z-index: 2;

          transition: background 300ms ease-in-out, border 300ms ease-in-out;
        }

        .top {
          flex: 1;
          flex-direction: row;
          justify-content: space-between;
        }

        .bottom {
          display: none;
        }
      }
  `}
    </style>
  </div>
);
