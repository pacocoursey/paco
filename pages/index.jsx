import React from 'react';
import Link from 'next/link';
import styled, { keyframes, css } from 'styled-components';

import Page from '../components/Page';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Intro = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Title = styled.div`
  h6 {
    margin: 0;
    opacity: 0;
    font-size: 2vw;
    text-transform: uppercase;
    font-weight: lighter;
    letter-spacing: 2px;
    animation: ${fadeUp} 500ms 0.5s ease-in-out forwards;
  }

  h1 {
    margin: 0 0 20px 0;
    opacity: 0;
    font-weight: 900;
    font-size: 15vw;
    font-style: italic;
    letter-spacing: -0.8vw;
    line-height: 1;
    animation: ${fadeUp} 500ms 0.6s ease-in-out forwards;
  }
`;

const Paragraph = styled.div`
  opacity: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  animation: ${fadeIn} 500ms 0.7s ease-in-out forwards;

  p {
    font-size: 1rem;
    margin-right: 50px;
    max-width: 350px;
    line-height: 1.4;
  }
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  flex: 0 1 50%;

  width: 350px;
  height: 200px;

  padding: 10px;
`;

const Overlay = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: linear-gradient(to top right, #222, #333);

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom left,
      transparent 20%,
      rgba(0, 0, 0, 0.4) 100%
    );
    z-index: 2;

    opacity: 0.5;
    transition: opacity 300ms ease-in-out;
  }

  .overlay-content {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    overflow: hidden;
    z-index: 3;

    transform: translateY(60%);
    transition: transform 300ms ease-in-out;

    h1 {
      margin: 0;
      font-weight: 500;
      font-size: 1.5rem;
    }

    p {
      margin: 0;
      opacity: 0;
      transition: opacity 300ms ease-in-out;
      color: #e6e6e6;
      font-weight: normal;
    }
  }

  &:hover {
    .overlay-content {
      transform: translateY(0);

      p {
        opacity: 1;
      }
    }

    &::after {
      opacity: 1;
    }
  }
`;

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isWhite: false,
    };
  }

  componentDidMount() {

  }

  render() {
    const { isWhite } = this.state;

    return (
      <Page>
        <Intro>
          <Title>
            <h6>Hello, I&apos;m</h6>
            <h1>PACO</h1>
          </Title>

          <Paragraph>
            <div>
              <p>
                I&apos;m a
                {' '}
                <b>software developer</b>
                {' '}
                focused on
                {' '}
                <b>web development</b>
                . I enjoy writing JavaScript and working on
                {' '}
                <b>open-source projects</b>
                .
              </p>

              <Link href="/about">
                <a>
                  Hire Me
                  <i>&#x27f6;</i>
                </a>
              </Link>
            </div>

            <div>
              <p>
                I&apos;m a senior
                {' '}
                <b>Computer Science</b>
                {' '}
                student at New Mexico Tech. My web skills are
                {' '}
                <b>self-taught</b>
                , and I&apos;m always learning.
              </p>

              <Link href="/projects">
                <a>
                  My Projects
                  <i>&#x27f6;</i>
                </a>
              </Link>
            </div>
          </Paragraph>
        </Intro>

        <Intro>
          <List>
            <Item>
              <a href="https://github.com/pacocoursey/viv" target="_blank" rel="noopener noreferrer">
                <Overlay
                  css={css`
                    background-image: url(https://via.placeholder.com/350x200);
                  `}
                >
                  <div className="overlay-content">
                    <h1>Opus</h1>
                    <p>Note-taking</p>
                  </div>
                </Overlay>
              </a>
            </Item>

            <Item>
              <a href="https://github.com/pacocoursey/viv" target="_blank" rel="noopener noreferrer">
                <Overlay
                  css={css`
                    background-image: url(https://via.placeholder.com/350x200);
                  `}
                >
                  <div className="overlay-content">
                    <h1>Dusk</h1>
                    <p>Customizable icons</p>
                  </div>
                </Overlay>
              </a>
            </Item>

            <Item>
              <a href="https://github.com/pacocoursey/viv" target="_blank" rel="noopener noreferrer">
                <Overlay
                  css={css`
                    background-image: url(https://via.placeholder.com/350x200);
                  `}
                >
                  <div className="overlay-content">
                    <h1>Viv</h1>
                    <p>Mousekeys</p>
                  </div>
                </Overlay>
              </a>
            </Item>
          </List>
        </Intro>
      </Page>
    );
  }
}

export default Index;
