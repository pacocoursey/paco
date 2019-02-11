import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');
  html {
    font-family: 'Inter', sans-serif;
  }

  @supports (font-variation-settings: normal) {
  html {
    font-family: 'Inter var', sans-serif;
  }

  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html,
  body {
    padding: 0;
    margin: 0;
  }

  body {
    min-height: 100vh;
    min-width: 100vw;
    color: #111111;
    background-color: #FDFDFD;
    font-size: 16px;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }

  ::selection {
    background-color: #111111;
    color: #ffffff;
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

export default ({ children }) => (
  <Wrapper>
    <Head>
      <title>Paco Coursey</title>
    </Head>

    {children}

    <GlobalStyle />
  </Wrapper>
);
