import React from 'react';

const Error404 = () => (
  <React.Fragment>
    <div className="number">
      <span>4</span>

      <div className="box">
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
      </div>

      <span>4</span>
    </div>

    <p>
      This page was lost in the flow.
      {' '}
      <a href="/" className="inline">
        Return home
      </a>
      .
    </p>

    <style jsx>
      {`
      .box {
        background-color: var(--lighter-gray);
        border-radius: 50%;
        height: 15vw;
        width: 15vw;
        position: relative;
        overflow: hidden;

        -webkit-mask-image: -webkit-radial-gradient(white, black);
        transition: background 300ms ease-in-out;
      }
      .wave {
        position: absolute;
        top: 50%;
        left: -50%;
        width: 30vw;
        height: 30vw;
        transform-origin: 50% 48%;
        border-radius: 43%;

        background-color: var(--color);
        transition: background 300ms ease-in-out;

        animation: drift 5s infinite linear;
      }

      .wave:nth-child(1) {
        opacity: 0.8;
      }

      .wave:nth-child(2) {
        opacity: 0.4;
        animation: drift 10s infinite linear;
      }

      .wave:nth-child(3) {
        opacity: 0.5;
        animation: drift 15s infinite linear;
      }

      @keyframes drift {
        from { transform: rotate(0deg); }
        from { transform: rotate(-360deg); }
      }
      `}
    </style>
  </React.Fragment>
);

const OtherError = ({ code }) => (
  <React.Fragment>
    <div className="number">
      <span>{code}</span>
    </div>

    <p>
      Sorry about that. Would you mind opening a
      {' '}
      <a href="https://github.com/pacocoursey/paco/issues" className="inline">
        GitHub issue
      </a>
      ?
    </p>
  </React.Fragment>
);

const Error = ({ code }) => (
  <div className="error">
    {code === 404 ? <Error404 /> : <OtherError code={code} /> }

    <style jsx>
      {`
      .error {
        max-width: 50rem;
        font-size: 1.5rem;
        text-align: center;

        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      :global(.number) {
        font-weight: bold;
        font-size: 20vw;
        display: flex;
        align-items: center;
        font-feature-settings: 'tnum' 1;
      }

      @media screen and (max-width: 950px) {
        :global(p) {
          font-size: 1rem;
        }
      }
      `}
    </style>
  </div>
);

export default Error;
