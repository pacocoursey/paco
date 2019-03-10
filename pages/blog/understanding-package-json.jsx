import React from 'react';
import json from 'highlight.js/lib/languages/json';
import markdown from 'markdown-in-js';

import MarkdownPost from '../../components/MarkdownPost';
import Footer from '../../components/PostFooter';
import Code from '../../components/Code';

export default MarkdownPost({
  id: 'understanding-package-json',
})(markdown`
  I began my Computer Science degree with an intensive introduction course in C. We used makefiles to compile and run each of our assignments.

  When I started learning modern web development in early 2018, I had no idea what Node.js or NPM was. My idea of building website involved writing HTML, CSS, and occasionally including a \`script\` tag. A year or so later, I'm finally comfortable with modern techniques.

  A major source of confusion for me was \`package.json\`. In short, \`package.json\` is a makefile for the JavaScript environment, with some caveats.

  ### Package Scripts

  Package managers like Yarn and NPM also serve as script runners for JavaScript projects. Unlike makefiles, scripts in \`package.json\` run in a special environment.

  Packages in \`node_modules\` that define an executable will have that executable appended to the environment PATH before running any scripts. This can be confusing. Let's see an example:

  ${
  <Code language="json" syntax={json}>
    {`
    "devDependencies": {
      "eslint": "1.0.0"
    },
    "scripts": {
      "lint": "eslint ."
    }
    `}
  </Code>}

  Running \`yarn lint\` will work correctly. However, just running \`eslint .\` from the command line will fail!<sup>1</sup> This was extremely confusing at first, did I have installed ESLint or not?

  The package script will work because Yarn recognizes that the ESLint dependency includes an executable, and appends it to the environment PATH when running any scripts.

  This is a great advantage of the modular nature of the JavaScript ecosystem. You don't have to install any global scripts or clutter up your PATH to work with JavaScript projects, just \`yarn install\`.

  ${<Footer>
    <p>Unless you have installed ESLint globally, which does add the executable to your PATH.</p>
  </Footer>}
`);
