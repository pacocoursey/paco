import React, { createRef } from 'react'
import styled, { css, keyframes } from 'styled-components'
import Page from '../components/Page';

const Cover = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  opacity: 0.05;
  z-index: -1;
  background-image: url("/static/white.jpg");
  background-size: cover;
  background-repeat: no-repeat;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.5;
  max-width: 500px;
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


export default class Index extends React.Component {
  state = {
    showArrow: true,
  }

  componentDidMount = () => {
    this.scrollSpy();
  }

  section = createRef()

  scrollSpy = () => {
    this.scrollSpyID = requestAnimationFrame(() => {
      const { innerHeight, scrollY } = window;

      if (scrollY === this.lastFrameScroll) {
        this.lastFrameScroll = scrollY;
        return this.scrollSpy();
      }

      this.lastFrameScroll = scrollY;
      let { showArrow } = this.state;
      const scrollOffset = (innerHeight / 2) + scrollY;

      if (scrollOffset > this.section.current.offsetTop) {
        this.setState({
          showArrow: false,
        });
      } else {
        this.setState({
          showArrow: true,
        });
      }

      this.scrollSpy();
    })
  }


  render() {
    const { showArrow } = this.state;

    return (
      <Page>
      <Image />

      <Cover>
        <Hello>Hello, I&apos;m</Hello>
        <Title>PACO</Title>

        <ArrowWrapper show={showArrow}>
          <DownArrow>&#x2193;</DownArrow>
        </ArrowWrapper>
      </Cover>

      <Cover ref={this.section}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia iaculis mi in egestas. Donec sed fringilla lacus. Vestibulum vestibulum ut nunc at suscipit. Pellentesque diam massa, faucibus tempor mi aliquam, pretium ullamcorper risus. Mauris blandit augue ac nisl accumsan, ut egestas libero imperdiet. Nunc et ante nec eros lobortis molestie. Vestibulum euismod nisi vitae turpis luctus pharetra. Ut aliquet quis arcu nec ultricies. Aliquam finibus egestas eros sit amet ullamcorper. Vivamus ullamcorper volutpat quam sed fermentum. Mauris pharetra et urna ac venenatis. Proin imperdiet nisi id est eleifend ultrices. Maecenas sodales mi eu sapien congue, vel lacinia eros luctus. In at efficitur nibh. Sed eu consequat orci. Cras rutrum aliquam suscipit.
        </Text>
      </Cover>
    </Page>
    );
  }

}
