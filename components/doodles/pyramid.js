const Pyramid = () => {
  return (
    <div className="container">
      <div className="side left"></div>
      <div className="side front"></div>
      <div className="side right"></div>
      <div className="side back"></div>

      {/* <div className="shadow"></div> */}

      <style jsx>{`
        .container {
          width: 400px;
          height: 400px;
          margin: 0 auto;
          position: relative;
          perspective: 300px;
          perspective-origin: 50% 40%;
        }

        .side {
          position: absolute;
          left: 140px;
          top: 150px;
          width: 0;
          height: 0;
          border-left: 60px solid transparent;
          border-right: 60px solid transparent;
          border-bottom: 120px solid var(--fg);
          transform-origin: 50% 0%;
          animation: spin 5s infinite linear;
        }

        .back {
          animation-delay: -2.5s;
        }

        .right {
          animation-delay: -1.25s;
        }

        .left {
          animation-delay: -3.75s;
        }

        @keyframes spin {
          0% {
            transform: rotateY(0deg) rotateX(30deg);
          }
          25% {
            transform: rotateY(90deg) rotateX(30deg);
          }
          50% {
            transform: rotateY(180deg) rotateX(30deg);
          }
          75% {
            transform: rotateY(270deg) rotateX(30deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(30deg);
          }
        }
        .shadow {
          position: absolute;
          top: 300px;
          left: 175px;
          width: 50px;
          height: 50px;
          background-color: var(--fg);
          box-shadow: 0 0 40px 40px var(--fg);
          animation: shadow 5s infinite linear;
        }

        @keyframes shadow {
          0% {
            transform: rotateX(90deg) rotateZ(0deg);
          }
          100% {
            transform: rotateX(90deg) rotateZ(-360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default Pyramid
