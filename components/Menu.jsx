import React from 'react';
import Link from 'next/link';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubMenuVisible: false,
      isWhite: false,
    };
  }

  componentDidMount() {
    document.addEventListener('click', e => this.handleClickOutside(e));
    document.addEventListener('keydown', e => this.handleKey(e));
  }

  componentWillUnmount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(e) {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.setState({
        isSubMenuVisible: false,
      });
    }
  }

  handleKey(e) {
    if (e.keyCode === 27) {
      // Close menu on 'ESC'
      this.setState({
        isSubMenuVisible: false,
      });
    } else if (e.keyCode === 77) {
      // Toggle menu on 'M'
      this.toggleMenu();
    } else if (e.keyCode === 84) {
      // Toggle theme on 'T'
      this.toggleTheme();
    }
  }

  toggleMenu(s) {
    if (s) {
      this.setState({
        isSubMenuVisible: s,
      });
    } else {
      this.setState(state => ({
        isSubMenuVisible: !state.isSubMenuVisible,
      }));
    }
  }

  toggleTheme() {
    this.setState(state => ({
      isWhite: !state.isWhite,
    }));
  }

  render() {
    const { isSubMenuVisible } = this.state;

    return (
      <div className={isSubMenuVisible ? 'menu visible' : 'menu'} ref={n => this.setWrapperRef(n)}>
        <Link href="/">
          <div className="logo">
            <svg width="30" viewBox="0 0 390 462" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 375C15 375 15 447 87 447C159 447 159 375 159 375V303V172.5H15V375Z" stroke="#111" strokeWidth="20" />
              <path d="M15 87C15 87 15 15 87 15H231C231 15 375 15 375 159C375 303 231 303 231 303H159C159 303 15 303 15 375V87Z" fill="white" stroke="#111" strokeWidth="20" />
            </svg>
          </div>
        </Link>

        <div className="blog" onClick={() => {this.toggleMenu(false)}}>
          <Link href="/blog">
            <div>
              <h2>Blog</h2>
              <svg viewBox="0 0 24 24" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </div>

        <div className="burger" onClick={() => {this.toggleMenu()}} onKeyDown={() => {this.handleKey()}}>
          <svg width="25" viewBox="0 0 131 106" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8H130.5" stroke="black" strokeWidth="10" />
            <path d="M0 53H130.5" stroke="black" strokeWidth="10" />
            <path d="M0 98H130.5" stroke="black" strokeWidth="10" />
          </svg>
        </div>

        <div className="projects" onClick={() => {this.toggleMenu(false)}}>
          <Link href="/projects">
            <div>
              <svg height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1L1 6L11 11L21 6L11 1Z" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 16L11 21L21 16" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 11L11 16L21 11" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h2>Projects</h2>
            </div>
          </Link>
        </div>

        <div className="toggle" onClick={() => {this.toggleTheme()}} />

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
          }

          .toggle, .logo, .burger, .blog, .projects {
            cursor: pointer;
          }

          .logo {
            transition: opacity 300ms ease-in-out;
          }

          .toggle {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid var(--color);
            transition: background 300ms ease-in-out, border 300ms ease-in-out, opacity 300ms ease-in-out;
          }

          .toggle:hover {
            background-color: var(--color);
            transition: background 300ms ease-in-out, border 300ms ease-in-out;
          }

          .blog, .projects {
            pointer-events: none;
            opacity: 0;
            transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
          }

          .blog div, .projects div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .blog h2,
          .projects h2 {
            user-select: none;
            font-size: 1rem;
            opacity: 0;
            transition: opacity 300ms ease-in-out;
          }

          .blog { transform: translateY(20px); }
          .projects { transform: translateY(-20px); }

          .blog:hover h2,
          .projects:hover h2 {
            opacity: 1;
            transition: opacity 300ms ease-in-out;
          }

          .burger svg path {
            transition: transform 300ms ease-in-out;
          }

          .logo svg path,
          .burger svg path,
          .blog svg path,
          .projects svg path {
            stroke: var(--color);
            fill: var(--bg);
          }

          .menu.visible .logo,
          .menu.visible .toggle {
            opacity: 0;
            transition: opacity 300ms ease-in-out;
          }

          .menu.visible .blog,
          .menu.visible .projects {
            pointer-events: all;
            opacity: 1;
            transform: translateY(0);
          }

          .menu.visible .burger svg path:nth-child(1) {
            transform: translateY(42%);
            transition: transform 300ms ease-in-out;
          }

          .menu.visible .burger svg path:nth-child(3) {
            transform: translateY(-42%);
            transition: transform 300ms ease-in-out;
          }
      `}
        </style>

        <style jsx global>
          {`
          :root {
            --color: ${this.state.isWhite ? '#111' : '#fdfdfd'};
            --bg: ${this.state.isWhite ? '#fdfdfd' : '#111'};
            --gray: ${this.state.isWhite ? '#7f7f7f' : '#666'};
            --light-gray: ${this.state.isWhite ? '#f0f0f0' : '#333'};
          }
          `}
        </style>
      </div>
    );
  }
}

export default Menu;
