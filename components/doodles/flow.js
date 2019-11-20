const Flow = () => (
  <>
    <div className="number">
      <div className="box">
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
      </div>
    </div>

    <style jsx>
      {`
        .box {
          background-color: var(--light-gray);
          border-radius: 50%;
          height: 200px;
          width: 200px;
          position: relative;
          overflow: hidden;

          -webkit-mask-image: -webkit-radial-gradient(white, black);
          transition: background-color 300ms ease-in-out;
        }
        .wave {
          position: absolute;
          top: 50%;
          left: -50%;
          width: 400px;
          height: 400px;
          transform-origin: 50% 48%;
          border-radius: 43%;

          background-color: var(--fg);
          transition: background-color 300ms ease-in-out;

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
          from {
            transform: rotate(0deg);
          }
          from {
            transform: rotate(-360deg);
          }
        }
      `}
    </style>
  </>
)

export default Flow
