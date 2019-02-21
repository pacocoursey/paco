import React from 'react';
import Link from 'next/link';
// import Page from '../components/Page';

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
      <div>
        <div className="intro">
          <div className="title">
            <h6>Hello, I&apos;m</h6>
            <h1>PACO</h1>
          </div>

          <div className="paragraph">
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
          </div>
        </div>

        <style jsx>
          {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .intro {
            dislpay: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
          }

          .title h6 {
            margin: 0;
            opacity: 0;
            font-size: 2vw;
            text-transform: uppercase;
            font-weight: lighter;
            letter-spacing: 2px;
            animation: fadeUp 500ms 0.5s ease-in-out forwards;
          }

          .title h1 {
            margin: 0 0 20px 0;
            opacity: 0;
            font-weight: 900;
            font-size: 15vw;
            font-style: italic;
            letter-spacing: -0.8vw;
            line-height: 1;
            animation: fadeUp 500ms 0.6s ease-in-out forwards;
          }

          .paragraph {
            flex: 1;
            opacity: 0;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            animation: fadeIn 500ms 0.7s ease-in-out forwards;
          }

          .paragraph p {
            font-size: 1rem;
            margin-right: 50px;
            max-width: 350px;
            line-height: 1.4;
          }
          `}
        </style>
      </div>
    );
  }
}

export default Index;
