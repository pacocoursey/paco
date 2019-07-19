import React from 'react';
import App, { Container } from 'next/app';

import Page from '../components/Page';
import Menu from '../components/Menu';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Menu toggleTheme={() => { this.toggleTheme(); }} />
        <Page>
          <Component {...pageProps} />
        </Page>

        <style jsx global>
          {`
            :root {
              --fg: #000;
              --bg: #FFF;
              --gray: #7F7F7F;
              --light-gray: #F0F0F0;
              --lighter-gray: #FAFAFA;

              --red: #FF3B30;

              --small-shadow: rgba(0, 0, 0, 0.05) 0px 5px 50px;
              --big-shadow: 0 30px 100px 5px var(--light-gray);
            }

            .dark {
              --fg: #FFF;
              --bg: #000;
              --gray: #888;
              --light-gray: #333;
              --lighter-gray: #222;

              --red: #FF3B30;

              --small-shadow: rgba(0, 0, 0, 0.05) 0px 5px 50px;
              --big-shadow: 0 30px 100px 5px #000;
            }
          `}
        </style>
      </Container>
    );
  }
}

export default MyApp;
