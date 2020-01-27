---
title: Understanding package.json
description: How to work with scripts in your package.json
slug: understanding-package-json
date: March 11, 2019
---

I began my Computer Science degree with an intensive introduction course in C. We used makefiles to compile and run each of our assignments.

When I started learning modern web development in early 2018, I had no idea what Node.js or NPM was. My idea of building website involved writing HTML, CSS, and occasionally including a `script` tag. A year or so later, I'm finally comfortable with modern techniques.

A major source of confusion for me was `package.json`. In short, `package.json` is a makefile for the JavaScript environment, with some caveats.

### Package Scripts

Package managers like Yarn and NPM also serve as script runners for JavaScript projects. Unlike makefiles, scripts in `package.json` run in a special environment.

Packages in `node_modules` that define an executable will have that executable appended to the environment PATH before running any scripts. This can be confusing. Let's see an example:

```json
"devDependencies": {
  "eslint": "1.0.0"
},
"scripts": {
  "lint": "eslint ."
}
```

Running `yarn lint` will work correctly. However, just running `eslint .` from the command line will fail!<sup>1</sup> This was extremely confusing at first, did I have  ESLint installed or not?

The package script will work because Yarn recognizes that the ESLint dependency includes an executable, and appends it to the environment PATH when running any scripts.

This is a great advantage of the modular nature of the JavaScript ecosystem. You don't have to install any global scripts or clutter up your PATH to work with JavaScript projects, just `yarn install`.

---

1. Unless you have installed ESLint globally, which does add the executable to your PATH (`yarn global add eslint`)
