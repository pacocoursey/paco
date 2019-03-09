import React from 'react';

import Post from '../../components/Post';
import Footer from '../../components/PostFooter';

export default () => (
  <Post title="Understanding package.json">
    <header>
      <h1>
        Understanding
        {' '}
        <code>package.json</code>
      </h1>
      <p>March 9, 2019</p>
    </header>

    <p>
      I began my Computer Science degree with an intensive introduction course in C. We used makefiles to compile and run each of our assignments.
    </p>

    <p>
      When I started learning modern web development in early 2018, I had no idea what Node.js or NPM was. My idea of building website involved writing HTML, CSS, and occasionally including a
      {' '}
      <code>script</code>
      {' '}
      tag. A year or so later, I&apos;m finally comfortable with modern techniques.
    </p>

    <p>
      A major source of confusion for me was
      {' '}
      <code>package.json</code>
      . In short,
      {' '}
      <code>package.json</code>
      {' '}
      is a makefile for the JavaScript environment, with some caveats.
    </p>

    <h3>Scripts</h3>

    <p>
      Package managers like Yarn and NPM also serve as script runners for JavaScript projects. Unlike makefiles, scripts in <code>package.json</code> run in a special environment.
    </p>

    <p>
      Packages in <code>node_modules</code> that define an executable will have that executable appended to the environment PATH before running any scripts. This can be confusing. Let's see an example:
    </p>

    <pre>
    {`
    "devDependencies": {
      "eslint": "1.0.0"
    },
    "scripts": {
      "lint": "eslint ."
    }
    `}
    </pre>

    <p>
      Running <code>yarn lint</code> will work correctly. However, just running <code>eslint .</code> from the command line will fail.<sup>1</sup> This is because Yarn recognizes that the ESLint dependency includes an executable, and appends it to the environment PATH when running any scripts.
    </p>

    <p>
      This is a great advantage of the modular nature of the JavaScript ecosystem. You don&apos;t have to install any global scripts or clutter up your PATH to work with JavaScript projects, just <code>yarn install</code>.
    </p>

    <Footer>
      <p>Unless you have installed ESLint globally, which does add the executable to your PATH.</p>
    </Footer>

    {/* <p>
      I first started learning web development in 2012 when I picked up a copy of
      {' '}
      <a href="http://www.htmlandcssbook.com/" className="inline">HTML & CSS: Design and Build Web Sites</a>
      . It was simple: write some HTML, link a CSS file, and add a
      {' '}
      <code>&lt;script&gt;</code>
      {' '}
      tag if you needed interactivity.
    </p>

    <p>
      I started to pick up web development again in early 2018 with Node.js. I knew JavaScript, but I understood practically nothing about using Node to build websites. When did we get to part where we write HTML?
    </p>

    <p>
      Fast forward a year
    </p> */}

  </Post>
);
