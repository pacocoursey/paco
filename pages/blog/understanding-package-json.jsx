import React from 'react';
import json from 'highlight.js/lib/languages/json';

import Post from '../../components/Post';
import Footer from '../../components/PostFooter';
import Code from '../../components/Code';
import Inline from '../../components/InlineCode';

export default () => (
  <Post title="Understanding package.json">
    <header>
      <h1>
        Understanding
        {' '}
        <Inline>package.json</Inline>
      </h1>
      <p>March 9, 2019</p>
    </header>

    <p>
      I began my Computer Science degree with an intensive introduction course in C. We used makefiles to compile and run each of our assignments.
    </p>

    <p>
      When I started learning modern web development in early 2018, I had no idea what Node.js or NPM was. My idea of building website involved writing HTML, CSS, and occasionally including a
      {' '}
      <Inline>script</Inline>
      {' '}
      tag. A year or so later, I&apos;m finally comfortable with modern techniques.
    </p>

    <p>
      A major source of confusion for me was
      {' '}
      <Inline>package.json</Inline>
      . In short,
      {' '}
      <Inline>package.json</Inline>
      {' '}
      is a makefile for the JavaScript environment, with some caveats.
    </p>

    <h3>Package Scripts</h3>

    <p>
      Package managers like Yarn and NPM also serve as script runners for JavaScript projects. Unlike makefiles, scripts in <Inline>package.json</Inline> run in a special environment.
    </p>

    <p>
      Packages in <Inline>node_modules</Inline> that define an executable will have that executable appended to the environment PATH before running any scripts. This can be confusing. Let's see an example:
    </p>

    <Code language="json" syntax={json}>
    {`
    "devDependencies": {
      "eslint": "1.0.0"
    },
    "scripts": {
      "lint": "eslint ."
    }
    `}
    </Code>

    <p>
      Running <Inline>yarn lint</Inline> will work correctly. However, just running <Inline>eslint .</Inline> from the command line will fail!<sup>1</sup> This was extremely confusing at first, did I have installed ESLint or not?
    </p>

    <p>
      The package script will work because Yarn recognizes that the ESLint dependency includes an executable, and appends it to the environment PATH when running any scripts.
    </p>

    <p>
      This is a great advantage of the modular nature of the JavaScript ecosystem. You don&apos;t have to install any global scripts or clutter up your PATH to work with JavaScript projects, just <Inline>yarn install</Inline>.
    </p>

    <Footer>
      <p>Unless you have installed ESLint globally, which does add the executable to your PATH.</p>
    </Footer>
  </Post>
);
