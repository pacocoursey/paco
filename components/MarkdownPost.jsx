import React from 'react';

import Post from './Post';

export default options => content => () => (
  <Post {...options}>
    {content}
  </Post>
);
