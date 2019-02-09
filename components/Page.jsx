import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    overflow-x: hidden;
  }

  body {
    min-height: 100vh;
    min-width: 100vw;
    color: #111111;
    background-color: #FDFDFD;
    font-size: 16px;
    font-family: "Inter";
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
  align-items: center;
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
