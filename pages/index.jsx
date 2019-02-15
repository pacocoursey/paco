import React, { createRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Page from '../components/Page';
import GitHub from '../components/GitHub';
import Twitter from '../components/Twitter';
import Mail from '../components/Mail';
import Logo from '../components/Logo';
import Burger from '../components/Burger';

const Cover = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const Hello = styled.h3`
  text-transform: uppercase;
  font-weight: normal;
  font-size: 1.25vw;
  letter-spacing: 0.5vw;

  margin: 0 0 -20px 0;
`;

const Title = styled.h1`
  color: #111111;
  font-weight: 900;
  font-style: italic;
  text-transform: uppercase;
  font-size: 13vw;
  letter-spacing: -0.8vw;
  margin: 0;
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: 0.1;
  z-index: -1;
  background-image: url("/static/white.jpg");
  background-size: cover;
  background-repeat: no-repeat;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20%;
    background-image: linear-gradient(to top, #fdfdfd, transparent);
  }
`;

const Text = styled.div`
  line-height: 1.5;
  font-size: 1.25rem;
  max-width: 450px;

  a {
    text-decoration: none;
    font-weight: bold;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const bob = keyframes`
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    opacity: 1;
    transform: translateY(50%);
  }
`;

const ArrowWrapper = styled.div`
  position: absolute;
  align-self: center;
  bottom: 50px;

  ${props => (!props.show ? css`opacity: 0;` : '')};
  transition: opacity 1.5s ease-in-out;
`;

const DownArrow = styled.div`
  font-size: 48px;
  font-weight: lighter;
  opacity: 0;

  animation: ${bob} 3s ease-in-out infinite forwards;
  animation-delay: 3s;
`;

const Toggle = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 3px solid #111;

  transition: background 150ms ease-in-out;

  &:hover {
    background: #111;
  }
`;

const Emojis = styled.div`
  height: 150px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const emojiCycle = keyframes`
  0%, 100% { content: "▲"; }
  20% { content: "🌑"; }
  40% { content: "☾"; }
  60% { content: "🖤"; }
  80% { content: "🖥"; }
`;

const Emoji = styled.div`
  font-size: 2rem;

  &::after {
    content: "";
    animation: ${emojiCycle} 2s linear forwards infinite;
  }
`;

const MediaLinks = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Link = styled.button`
  cursor: pointer;
  width: 80px;
  height: 80px;
  border: 2px solid #111;
  background-color: transparent;

  outline: none;

  margin-right: 10px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  transition: background 150ms ease-in-out;

  svg {
    width: 30px;

    path {
      transition: fill 150ms ease-in-out, stroke 150ms ease-in-out;
    }
  }

  &:hover {
    svg path {
      transition: fill 150ms ease-in-out, stroke 150ms ease-in-out;
    }
  }

  &#github:hover {
    background-color: #7CE5E7;
    svg path { fill: #fff; }
  }

  &#twitter {
    border-color: #1DA1F2;

    &:hover {
      background-color: #1DA1F2;
      svg path { fill: #fff; }
    }
  }

  &#email {
    border-color: #FF0080;

    svg path {
      fill: #FF0080;
    }

    &:hover {
      background-color: #FF0080;
      svg path { fill: #fff; }
    }
  }
`;

const Menu = styled.div`
  z-index: 2;
  position: fixed;
  left: 0;
  top: 0;
  width: 100px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 50px 0;
  opacity: 0;
  transform: translateX(-100%);

  transition: opacity 150ms ease-in-out, transform 300ms ease-in-out;

  ${props => (props.show ? 'transform: translateX(0); opacity: 1' : '')};

  svg {
    cursor: pointer;
  }
`;


export default class Index extends React.Component {
  state = {
    pastIntroduction: false,
  }

  about = createRef();

  education = createRef();

  works = createRef();

  contact = createRef();

  componentDidMount = () => {
    this.scrollSpy();
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
    });
  }

  scrollSpy = () => {
    this.scrollSpyID = requestAnimationFrame(() => {
      const { innerHeight, scrollY } = window;

      if (scrollY === this.lastFrameScroll) {
        this.lastFrameScroll = scrollY;
        return this.scrollSpy();
      }

      this.lastFrameScroll = scrollY;
      const scrollOffset = (innerHeight / 2) + scrollY;

      if (scrollOffset > this.about.current.offsetTop) {
        this.setState({ pastIntroduction: true });
      } else {
        this.setState({ pastIntroduction: false });
      }

      return this.scrollSpy();
    });
  }


  render() {
    const { pastIntroduction } = this.state;

    return (
      <Page>
        <Image />

        <Menu show={pastIntroduction}>
          <Logo />
          <Burger />
          <Toggle />
        </Menu>

        <Cover className="active">
          <div>
            <Hello>Hello, I&apos;m</Hello>
            <Title>PACO</Title>
          </div>

          <ArrowWrapper show={!pastIntroduction}>
            <DownArrow>&#x2193;</DownArrow>
          </ArrowWrapper>
        </Cover>

        <div>
          <Cover ref={this.about}>
            <Text data-aos="fade-up" data-aos-anchor-placement="top-center">
              <h2>I&apos;m a software developer.</h2>
              <p>
                I enjoy building websites, writing JavaScript,
                and working on open-source projects. I write
                about programming on my
                {' '}
                <a href="/blog">blog</a>
                .
              </p>

              <div><span>I&apos;m into UX/UI design. My designs tend to be</span></div>
              <div><span>clear, simple, and minimal.</span></div>
            </Text>
          </Cover>

          <Cover ref={this.education}>
            <Text data-aos="fade-up" data-aos-anchor-placement="top-center">
              <h2>I&apos;m a student.</h2>
              <p>
                <span>
                  I&apos;m a senior at
                  {' '}
                  <a href="http://nmt.edu">New Mexico Tech</a>
                  , pursuing a Bachelor&apos;s in Computer Science.
                </span>
              </p>

              <p>
                <span>
                  My web skills are self-taught, and I&apos;m always learning.
                  I learn best through
                  {' '}
                  <a href="https://github.com/pacocoursey">side projects</a>
                  .
                </span>
              </p>
            </Text>
          </Cover>

          <Cover ref={this.works}>
            <Text data-aos="fade-up" data-aos-anchor-placement="top-center">
              <h2>Selected works:</h2>
            </Text>
          </Cover>

          <Cover ref={this.contact}>
            <Text data-aos="fade-up" data-aos-anchor-placement="top-center">
              <h2>Get in touch.</h2>
              <MediaLinks>
                <a href="https://github.com/pacocoursey">
                  <Link id="github">
                    <GitHub />
                  </Link>
                </a>

                <a href="https://twitter.com/pacocoursey">
                  <Link id="twitter">
                    <Twitter />
                  </Link>
                </a>

                <a href="mailto:p@paco.im">
                  <Link id="email" href="mailto:p@paco.im">
                    <Mail />
                  </Link>
                </a>
              </MediaLinks>
            </Text>
          </Cover>
        </div>

        <Emojis>
          <Emoji />
        </Emojis>
      </Page>
    );
  }
}
