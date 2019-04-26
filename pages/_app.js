/* global document */

import React from 'react';
import App, { Container } from 'next/app';
import cookies from 'next-cookies';

import Page from '../components/Page';
import Menu from '../components/Menu';

import ThemeContext from '../components/ThemeContext';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
      cookies: cookies(ctx),
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      theme: this.props.cookies.theme || 'dark',
    };
  }

  toggleTheme() {
    // Update the component state
    this.setState(state => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    }), () => {
      // Update the cookie
      const { theme } = this.state;
      document.cookie = `theme=${theme}; path=/`;
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    const { theme } = this.state;

    return (
      <Container>
        <ThemeContext.Provider value={this.state.theme}>
          <Menu toggleTheme={() => { this.toggleTheme(); }} />
          <Page>
            <Component {...pageProps} />
          </Page>
        </ThemeContext.Provider>

        <style jsx global>
          {`
            :root {
              --color: ${theme === 'light' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)'} !important;
              --bg: ${theme === 'light' ? '#ffffff' : '#111'} !important;
              --gray: ${theme === 'light' ? '#7f7f7f' : '#666'} !important;
              --light-gray: ${theme === 'light' ? '#f0f0f0' : '#333'} !important;
              --lighter-gray: ${theme === 'light' ? '#fafafa' : '#222'} !important;

              --red: #FF3B30;

              --small-shadow: rgba(0, 0, 0, 0.05) 0px 5px 50px;
              --big-shadow: 0 30px 100px 5px ${theme === 'light' ? 'var(--light-gray)' : '#000'};
            }
          `}
        </style>
      </Container>
    );
  }
}

export default MyApp;
