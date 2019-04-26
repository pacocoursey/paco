import React from 'react';

// All the covers are imported. The given ID determines which gets returned.
import * as covers from './covers/index';

const Cover = ({ id }) => {
  const Image = covers[id] || covers.Placeholder;
  return <Image />;
};

export default Cover;
