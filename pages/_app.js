import React from 'react';
import App, { Container } from 'next/app';
import Page from '../components/Page';
import Menu from '../components/Menu';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Menu />
        <Page>
          <Component {...pageProps} />
        </Page>
      </Container>
    );
  }
}

export default MyApp;
