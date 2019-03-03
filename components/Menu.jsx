/* global document */

import React from 'react';
import Link from 'next/link';

import {
  Logo,
  Blog,
  Toggle,
} from './icons';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    const { theme } = this.props;
    this.state = {
      isWhite: theme === 'white',
    };

    this.handleKey = this.handleKey.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }

  handleKey(e) {
    if (e.keyCode === 84) {
      // Toggle theme on 'T'
      this.toggleTheme();
    }
  }

  toggleTheme() {
    this.setState(state => ({
      isWhite: !state.isWhite,
    }), () => {
      const { isWhite } = this.state;
      const theme = isWhite ? 'white' : 'black';
      document.cookie = `theme=${theme}`;
    });
  }

  render() {
    const { isWhite } = this.state;

    return (
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
            onClick={() => { this.toggleTheme(); }}
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

            transition: border 300ms ease-in-out;

            border-right: 1px solid var(--light-gray);
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

          .menu .menu-item {
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
      `}
        </style>

        <style jsx global>
          {`
          :root {
            --color: ${isWhite ? '#111' : '#ffffff'} !important;
            --bg: ${isWhite ? '#ffffff' : '#111'} !important;
            --gray: ${isWhite ? '#7f7f7f' : '#666'} !important;
            --light-gray: ${isWhite ? '#f0f0f0' : '#333'} !important;

            --big-shadow: 0 30px 100px 5px ${isWhite ? 'var(--light-gray)' : '#000'};
          }
          `}
        </style>
      </div>
    );
  }
}

export default Menu;
