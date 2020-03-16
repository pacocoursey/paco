---
title: Better Next.js Imports
description: Improved import statements with absolute paths using babel plugins.
slug: better-nextjs-imports
date: March, 15, 2020
---

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

---

You don't have to use `@` as the prefix, that's simply my preference. You can make it fully absolute (`import Button from 'components/button'`) or use another prefix (`import Button from '$$components/button'`).

Editors like VSCode automatically support the config in `jsconfig.json`, so Command+Click to jump to the source of a file will work as usual. [Atom and IntelliJ](https://github.com/tleunen/babel-plugin-module-resolver#editors-autocompletion) also have support for rewrites.
