import React, { createRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import NextLink from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

import * as Icons from '../components/icons';
import Page from '../components/Page';

const Cover = styled.div`
  ${props => (props.height ? `min-height: ${props.height}` : 'min-height: 50vh')};
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

const Toggle = styled.span`
  cursor: pointer;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  border: 2px solid #111;

  transition: background 300ms ease-in-out;

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

  transition: background 300ms ease-in-out;

  svg {
    width: 30px;

    path {
      transition: fill 300ms ease-in-out, stroke 300ms ease-in-out;
    }
  }

  &:hover {
    svg path {
      transition: fill 300ms ease-in-out, stroke 300ms ease-in-out;
    }
  }

  &#github:hover {
    background-color: #111;
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
  width: 100vw;
  height: 100px;

  background-color: #fdfdfd;
  border-bottom: 1px solid #efefef;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 20%;
  opacity: 0;
  transform: translateY(-100%);

  transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;

  ${props => (props.show ? 'transform: translateY(0); opacity: 1' : '')};

  #logo, #toggle {
    cursor: pointer;
    transition: opacity 300ms ease-in-out;
  }

  #logo, #toggle {
    ${props => (props.showIcons ? '' : 'opacity: 0; pointer-events: none;')};
  }
`;

const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  opacity: 0;
  transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;

  ${props => (props.show ? 'opacity: 1' : '')};

  h3 {
    font-size: 14px;
    user-select: none;
    margin: 0 20px;
    opacity: 0;
    transition: opacity 300ms ease-in-out;
  }

  &:hover {
    h3 {
      opacity: 1;
    }
  }
`;

const Left = styled(MenuItem)`
  transform: translateX(20px);

  ${props => (props.show ? css`transform: translateY(0)` : '')};
`;

const Right = styled(MenuItem)`
  flex-direction: row-reverse;
  transform: translateX(-20px);
  ${props => (props.show ? css`transform: translateY(0)` : '')};
`;

const Burger = styled.div`
  cursor: pointer;

  svg path {
    transition: transform 300ms ease-in-out;
  }

  ${props => (props.on ? css`
    svg path:first-child {
      transform: translateY(42%);
    }

    svg path:nth-child(3) {
      transform: translateY(-42%);
    }
  ` : '')}
`;

const Logo = styled.div`
  /* svg path {
    transition: fill 300ms ease-in-out;
  }

  &:hover svg path {
    fill: #111;
    transition: fill 300ms ease-in-out;
  } */

  &:hover {
    opacity: 0.5;
  }
`;

export default class Index extends React.Component {
  state = {
    pastIntroduction: false,
    showSubMenu: false,
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
      const scrollOffset = (innerHeight / 3) + scrollY;

      if (scrollOffset > this.about.current.offsetTop) {
        this.setState({ pastIntroduction: true });
      } else {
        this.setState({ pastIntroduction: false });
      }

      return this.scrollSpy();
    });
  }

  toggleSubMenu() {
    this.setState(state => ({
      showSubMenu: !state.showSubMenu,
    }));
  }

  render() {
    const { pastIntroduction, showSubMenu } = this.state;

    return (
      <Page>
        <Image />

        <Menu show={pastIntroduction} showIcons={!showSubMenu}>
          <Logo id="logo">
            <Icons.Logo />
          </Logo>

          <NextLink href="/blog">
            <Left show={showSubMenu}>
              <h3>Blog</h3>
              <Icons.Blog />
            </Left>
          </NextLink>

          <Burger onClick={() => this.toggleSubMenu()} on={showSubMenu}>
            <Icons.Burger />
          </Burger>

          <NextLink href="/projects">
            <Right show={showSubMenu}>
              <h3>Projects</h3>
              <Icons.Projects />
            </Right>
          </NextLink>

          <Toggle id="toggle" />
        </Menu>

        <Cover className="active" height="100vh">
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
            <Text data-aos="fade-up">
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
            <Text data-aos="fade-up">
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
                  <a href="https://github.com/pacocoursey">projects</a>
                  .
                </span>
              </p>
            </Text>
          </Cover>

          <Cover ref={this.works}>
            <Text data-aos="fade-up">
              <h2>Selected works:</h2>
            </Text>
          </Cover>

          <Cover ref={this.contact}>
            <Text data-aos="fade-up">
              <h2>Get in touch.</h2>
              <MediaLinks>
                <a href="https://github.com/pacocoursey">
                  <Link id="github">
                    <Icons.GitHub />
                  </Link>
                </a>

                <a href="https://twitter.com/pacocoursey">
                  <Link id="twitter">
                    <Icons.Twitter />
                  </Link>
                </a>

                <a href="mailto:p@paco.im">
                  <Link id="email" href="mailto:p@paco.im">
                    <Icons.Mail />
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
