import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Progress from 'nprogress';

let progress;
const stopProgress = () => {
  clearInterval(progress);
  Progress.done();
};

Router.onRouteChangeStart = () => {
  progress = Progress.start();
};

Router.onRouteChangeComplete = stopProgress;
Router.onRouteChangeError = stopProgress;

export default ({ children, title }) => (
  <div>
    <Head>
      <title>{title || 'Paco Coursey'}</title>

      {/* Meta */}
      <meta charSet="utf-8" />
      <meta name="author" content="Paco Coursey" />
      <meta name="keywords" content="paco, coursey, paco coursey, computer science, software, software engineering, web, web development, web design, developer, javascript, node, html, css" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Web developer at the intersection of design and code." />

      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
      <link rel="manifest" href="/static/site.webmanifest" />
      <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#111111" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {/* TODO: open graph image generator */}
      <meta name="twitter:description" content="Hey, I'm Paco." />
      <meta name="twitter:creator" content="@pacocoursey" />
      <meta name="twitter:site" content="@pacocoursey" />

      {/* Facebook */}
      <meta property="og:title" content="Paco Coursey" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://paco.im" />
      {/* TODO: open graph image generator */}

      {/* Misc */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    </Head>

    <div className="main">
      {children}
    </div>

    <style jsx global>
      {`
      :root {
        --sans-serif: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        --monospace: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
      }

      @import url('/static/font/inter.css');
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
        color: var(--fg);
        font-family: var(--sans-serif);
        font-size: 16px;

        transition: background 300ms ease-in-out, color 300ms ease-in-out;
      }

      .main {
        min-height: 100vh;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        padding-left: 100px;
      }

      hr {
        width: 100%;
        border: none;
        height: 1px;
        background-color: var(--light-gray);
        margin: 3rem auto;
        transition: background 300ms ease-in-out;
      }

      #nprogress {
        pointer-events: none;
      }

      #nprogress .bar {
        background: var(--fg);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
      }

      @media screen and (max-width: 950px) {
        .main {
          padding: 0;
        }
      }
      `}
    </style>
  </div>
);
