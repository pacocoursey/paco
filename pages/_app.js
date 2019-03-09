import React from 'react';
import App, { Container } from 'next/app';
import cookies from 'next-cookies';

import Page from '../components/Page';
import Menu from '../components/Menu';

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
      theme: this.props.cookies.theme || 'black',
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    const { theme } = this.state;

    return (
      <Container>
        <Menu theme={theme} />
        <Page>
          <Component {...pageProps} />
        </Page>
      </Container>
    );
  }
}

export default MyApp;
