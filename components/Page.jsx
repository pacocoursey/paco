import React from 'react';
import Head from 'next/head';

import Menu from './Menu';

export default ({ children, title }) => (
  <div>
    <Head>
      <title>{title || 'Paco Coursey'}</title>

      {/* Meta */}
      <meta charSet="utf-8" />
      <meta name="keywords" value="Paco Coursey" />

      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
      <link rel="manifest" href="/static/site.webmanifest" />
      <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#111111" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
    </Head>

    <Menu />

    <div className="main">
      {children}
    </div>

    <style jsx>
      {`
      .main {
        min-height: 100vh;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        padding: 50px 30px 50px 170px;
      }
      `}
    </style>

    <style global jsx>
      {`
      :root {
        --black: #111;
        --white: #fdfdfd;

        --color: var(--white);
        --bg: var(--black);
        --gray: #666;
        --light-gray: #333;

        --sans-serif: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        --monospace: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
      }

      @import url('https://rsms.me/inter/inter.css');
      html {
        font-family: 'Inter', var(--sans-serif);
      }

      @supports (font-variation-settings: normal) {
      html {
        font-family: 'Inter var', var(--sans-serif);
      }

      * {
        box-sizing: border-box;
      }

      .preload * {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -ms-transition: none !important;
        -o-transition: none !important;
        transition: none !important;
      }

      html,
      body {
        padding: 0;
        margin: 0;
      }

      body {
        min-height: 100vh;
        background-color: var(--bg);
        color: var(--color);
        font-family: var(--sans-serif);
        font-size: 16px;
      }

      .main {
        min-height: 100vh;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        padding: 50px 30px 50px 170px;
      }

      a {
        color: inherit;
        text-decoration: none;
        font-weight: bold;
      }

      a.inline:hover {
        text-decoration: underline;
      }

      a i {
        margin-left: 5px;
        font-style: normal;
        display: inline-block;
        transition: transform 300ms ease-in-out;
      }

      a:hover i {
        transform: translateX(10px);
        transition: transform 300ms ease-in-out;
      }

      code {
        padding: 0.25rem 1rem;
        font-family: var(--monospace);
        background-color: var(--light-gray);
        border-radius: 5px;
      }

      hr {
        width: 20%;
        border: none;
        height: 1px;
        background-color: var(--gray);
        margin: 3rem auto;
      }
      `}
    </style>
  </div>
);
