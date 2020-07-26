---
title: Better Next.js Imports
description: Improved import statements with absolute paths using babel plugins.
slug: better-nextjs-imports
date: March 15, 2020
---

Nine days after first writing this post, the Next.js team [landed support for paths](https://github.com/zeit/next.js/pull/11293) in `tsconfig.json` and `jsconfig.json` by default! In Next.js 9.4 and onwards, you only need to specify a `baseURL` in your config file to support absolute imports:

```json
// tsconfig.json or jsconfig.json
{
  compilerOptions: {
    "baseURL": "."
  }
}

// import Button from 'components/button'
```

To use a custom prefix, add a `paths` configuration:

```json
{
  compilerOptions: {
    "baseURL": ".",
    "paths": {
      "@components/*": ["components/*"]
    }
  }
}

// import Button from '@components/button'
```

---

Editors like VSCode automatically support the config in `jsconfig.json`, so Command+Click to jump to the source of a file will work as usual. [Atom and IntelliJ](https://github.com/tleunen/babel-plugin-module-resolver#editors-autocompletion) also have support for rewrites.

---

<details>
  <summary>The original post, using a babel plugin.</summary>

Relative import statements are a pain. To avoid `../` chains, improve code portability, and type less, I've started using [`babel-plugin-module-resolver`](https://github.com/tleunen/babel-plugin-module-resolver) in my Next.js projects.

The goal is to transform verbose import statements like this:

```js
import Button from '../../../../components/button'
```

into absolute import statements that work anywhere in your project:

```js
import Button from '@components/button'
```

Let's do it. Install the babel plugin as a `devDependency`:

```bash
$ yarn add babel-plugin-module-resolver -D
```

In the root of your Next.js project, create a `.babelrc.json` file and add the `module-resolver` plugin:

```js
module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@components': './components'
        }
      }
    ]
  ]
}
```

Create a `jsconfig.json` (or `tsconfig.json` if you're using TypeScript) and add the `paths` property:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["components/*"]
    }
  }
}
```

Note that the syntax is slightly different than the babel config.

If you're using a mixed JS/TS codebase, you should include JS files in your `tsconfig.json`:

```json
{
  "include": ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"]
}
```

Now you can update your import statements to use the new syntax!
</details>
