import React from 'react';

// All the covers are imported. The given ID determines which gets returned.
import * as covers from './covers/index';

const Cover = ({ id }) => {
  const Image = covers[id] || covers.Placeholder;
  return (
    <div>
      <Image />

      <style jsx>
        {`
          div :global(svg) {
            width: 100%;
          }

          div :global(svg *) {
            transition: fill 300ms ease-in-out, stroke 300ms ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default Cover;
