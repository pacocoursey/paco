import React, { createRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Page from '../components/Page';

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
  font-weight: lighter;
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
  max-width: 420px;
  position: relative;
  overflow: hidden;

  p {
    font-size: 1.25rem;

    span {
      background: #111;
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
  position: sticky;
  top: 1rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Item = styled.div`

`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Toggle = styled.div`
  cursor: pointer;
  position: sticky;
  top: 3rem;
  left: 3rem;

  margin: 10px;
  opacity: 0;

  width: 12px;
  height: 12px;
  border-radius: 100%;
  border: 2px solid #111;

  z-index: 2;

  transition: background 150ms, opacity 150ms;

  ${props => (props.show ? 'opacity: 1' : '')};

  &:hover {
    background: #111;
  }
`;


export default class Index extends React.Component {
  state = {
    pastIntroduction: false,
  }

  section = createRef()

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
      const scrollOffset = (innerHeight / 2) + scrollY;

      console.log(scrollOffset);


      if (scrollOffset > this.section.current.offsetTop) {
        this.setState({
          pastIntroduction: true,
        });
      } else {
        this.setState({
          pastIntroduction: false,
        });
      }

      return this.scrollSpy();
    });
  }


  render() {
    const { pastIntroduction } = this.state;

    return (
      <Page>
        <Toggle show={pastIntroduction} />
        <Image />

        <Cover>
          <div>
            <Hello>Hello, I&apos;m</Hello>
            <Title>PACO</Title>
          </div>

          <ArrowWrapper show={!pastIntroduction}>
            <DownArrow>&#x2193;</DownArrow>
          </ArrowWrapper>
        </Cover>

        <Cover ref={this.section}>
          <Text>
            <h2>I&apos;m a software developer.</h2>
            <p><span>I enjoy building websites, writing JavaScript, and working on open-source projects.</span></p>
          </Text>
        </Cover>

        <Cover>
          <Text>
            a;sldkfjas dfjlasd ;jal sdfjas l;dfjkas;ld fjdkls;fj ;
          </Text>
        </Cover>
      </Page>
    );
  }
}
