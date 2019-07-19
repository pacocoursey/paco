import React from 'react';

export default () => (
  <footer>
    <div className="emojis">
      <div className="emoji" />
    </div>

    <style jsx>
      {`
      h1 {
        font-size: 3rem;
      }

      .emojis {
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }

      @keyframes emojiCycle {
        0%, 100% { content: "▲"; }
        20% { content: "🌑"; }
        40% { content: "🌙"; }
        60% { content: "🖤"; }
        80% { content: "🖥"; }
      }

      .emoji {
        font-size: 2rem;
        color: transparent;
        text-shadow: 0 0 0 var(--fg);
      }

      .emoji::after {
        content: "▲";
        animation: emojiCycle 2s linear forwards infinite;
      }
      `}
    </style>
  </footer>
);
