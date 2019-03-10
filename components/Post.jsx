/* global window, document */

import React from 'react';
import Head from 'next/head';

import posts from '../data/blog.json';

const findPost = id => posts.find(post => post.id === id);

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollHeight: '0%',
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    let ticking = false;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        const h = document.documentElement;
        const b = document.body;
        const st = 'scrollTop';
        const sh = 'scrollHeight';
        const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
        this.setState({
          scrollHeight: `${percent}%`,
        });
      });

      ticking = true;
    }
  }

  render() {
    const { children, id } = this.props;
    const { scrollHeight } = this.state;

    const post = findPost(id);

    return (
      <article>
        <header>
          <h1>{post.title}</h1>
          <p>{post.date}</p>
        </header>

        {children}

        <style jsx>
          {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          article, article img {
            max-width: 42rem;
          }

          article {
            font-size: 1.15rem;
            letter-spacing: -0.022rem;
            line-height: 1.8;
            opacity: 0;
            animation: fadeIn 500ms 0.7s ease-in-out forwards;
          }

          article :global(p) {
            margin: 1.875rem 0;
          }

          article :global(header) {
            opacity: 0;
            margin-bottom: 2rem;
            animation: fadeUp 500ms 0.5s ease-in-out forwards;
          }

          article :global(header h1) {
            color: inherit;
            font-size: 2rem;
            margin: 0 0 0.5rem 0;
          }

          article :global(header p) {
            margin: 0;
            color: var(--gray);
            font-size: 1rem;
          }
          `}
        </style>

        <style jsx global>
          {`
          .menu::after {
            content: "";
            position: absolute;
            top: 0;
            right: -1px;
            height: ${scrollHeight || '0%'};
            width: 1px;
            background-color: var(--color);

            transition: background 300ms ease-in-out;
          }

          @media screen and (max-width: 950px) {
            .menu::after {
              left: 0;
              height: 1px;
              width: ${scrollHeight || '0%'}
            }
          }
          `}
        </style>
      </article>
    );
  }
}

export default Post;
