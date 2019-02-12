import React, { createRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Page from '../components/Page';
import GitHub from '../components/GitHub';
import Twitter from '../components/Twitter';
import Mail from '../components/Mail';

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
  letter-spacing: 5px;

  margin: 0 0 -20px 0;
`;

const Title = styled.h1`
  color: #111111;
  font-weight: 900;
  font-style: italic;
  text-transform: uppercase;
  font-size: 140px;
  letter-spacing: -10px;
  margin: 0;
`;

const Dots = styled.div`
  width: 100vw;
  height: 400px;
  transform: rotate(-30deg);
  position: absolute;
  z-index: -1;

  background-size: 50px 50px;
  background-image: radial-gradient(rgba(0, 0, 0, 0.9) 1px, #fff 1px);
  background-position: center;
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
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
  max-width: 450px;
  position: relative;
  overflow: hidden;

  p {
    font-size: 1.25rem;

    span {
      /* background: #111; */
    }
  }

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
  bottom: 100px;


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

const Menu = styled.div`
  position: fixed;
  top: 50vh;
  transform: translate(-100%, -50%);
  left: 15vw;

  opacity: 0;
  z-index: 2;

  transition: opacity 150ms ease-in-out, transform 500ms ease-in-out;
  ${props => (props.show ? css`opacity: 1; transform: translate(0, -50%)` : '')};

  line-height: 2;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Item = styled.div`
  font-weight: 300;
  font-size: 1.25rem;
  position: relative;
  padding-right: 20px;
  color: #999;

  transition: color 150ms ease-in-out;

  a {
    text-decoration: none;
    color: inherit;
  }

  &.active {
    color: #111;
  }

  &:hover {
    color: #111;
  }
`;

const Toggle = styled.div`
  cursor: pointer;
  position: sticky;
  top: 3rem;
  left: 3rem;

  margin: 10px;
  opacity: 0;

  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 3px solid #111;

  z-index: 2;

  transition: background 150ms, opacity 150ms;

  ${props => (props.show ? 'opacity: 1' : '')};

  &:hover {
    background: #111;
  }
`;

const Emojis = styled.div`
  width: 100vw;
  height: 100px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const emojiCycle = keyframes`
  0%, 100% {
    content: "▲";
  }

  20% {
    content: "🌑";
  }

  40% {
    content: "☾";
  }

  60% {
    content: "🖤";
  }

  80% {
    content: "🖥";
  }
`;

const Emoji = styled.div`
  font-size: 2rem;

  &::after {
    content: "";
    animation: ${emojiCycle} 3s linear forwards infinite;
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


export default class Index extends React.Component {
  state = {
    pastIntroduction: false,
    activeSection: '#about',
  }

  about = createRef();

  education = createRef();

  works = createRef();

  contact = createRef();

  componentDidMount = () => {
    this.scrollSpy();
  }

  scrollSpy = () => {
    this.scrollSpyID = requestAnimationFrame(() => {
      const { innerHeight, scrollY } = window;

      if (scrollY === this.lastFrameScroll) {
        this.lastFrameScroll = scrollY;
        return this.scrollSpy();
      }

      this.lastFrameScroll = scrollY;
      let { activeSection } = this.state;
      const scrollOffset = (innerHeight / 2) + scrollY;

      if (scrollOffset > this.about.current.offsetTop) {
        this.setState({
          pastIntroduction: true,
        });
        activeSection = '#about';
      } else {
        this.setState({
          pastIntroduction: false,
        });
      }

      if (scrollOffset > this.education.current.offsetTop) {
        activeSection = '#education';
      }

      if (scrollOffset > this.works.current.offsetTop) {
        activeSection = '#works';
      }

      if (scrollOffset > this.contact.current.offsetTop) {
        activeSection = '#contact';
      }

      if (activeSection !== this.state.activeSection) {
        window.history.pushState(null, null, activeSection);
        this.setState({ activeSection }, this.scrollSpy);
      } else {
        this.scrollSpy();
      }
    });
  }


  render() {
    const { pastIntroduction, activeSection } = this.state;

    return (
      <Page>
        <Toggle show={pastIntroduction} />
        <Image />

        <Menu show={pastIntroduction}>
          <Item className={activeSection === '#about' ? 'active' : ''}>
            <a href="#about">about</a>
          </Item>

          <Item className={activeSection === '#education' ? 'active' : ''}>
            <a href="#education">education</a>
          </Item>

          <Item className={activeSection === '#works' ? 'active' : ''}>
            <a href="#works">works</a>
          </Item>

          <Item className={activeSection === '#contact' ? 'active' : ''}>
            <a href="#contact">contact</a>
          </Item>
        </Menu>

        <Cover>
          <div>
            <Hello>Hello, I&apos;m</Hello>
            <Title>PACO</Title>
          </div>

          <Emojis>
            <Emoji />
          </Emojis>

          <ArrowWrapper show={!pastIntroduction}>
            <DownArrow>&#x2193;</DownArrow>
          </ArrowWrapper>
        </Cover>

        <div>
          <Cover ref={this.about} id="about">
            <Text>
              <h2>I&apos;m a software developer.</h2>
              <p>
                <span>
                  I enjoy building websites, writing JavaScript,
                  and working on open-source projects. I write about programming on my
                  {' '}
                  <a href="/blog">blog</a>
                  .
                </span>
              </p>

              <p>
                <span>
                  I&apos;m into UX/UI design. My designs tend to be clear, simple, and minimal.
                </span>
              </p>
            </Text>
          </Cover>

          <Cover ref={this.education} id="education">
            <Text>
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

          <Cover ref={this.works} id="works">
            <Text>
              a;sldkfjas dfjlasd ;jal sdfjas l;dfjkas;ld fjdkls;fj ;
            </Text>
          </Cover>

          <Cover ref={this.contact} id="contact">
            <Text>
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

          {/* <Footer>
            <Logo />
          </Footer> */}
        </div>
      </Page>
    );
  }
}
