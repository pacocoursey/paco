---
title: Disable transitions on theme toggle
description: Prevent element flashing when switching between themes.
slug: disable-theme-transitions
date: Mar 19, 2020
---

It's difficult to transition between themes smoothly. Adding a CSS `transition` to every element negatively impacts rendering performance, and it also won't work for images, icons, and CSS properties that don't support transitions.

Instead, we can temporarily remove transitions from all elements so that toggling themes feels snappy and consistent. We'll manually create a stylesheet that disables transitions:

```js
const css = document.createElement('style')
css.type = 'text/css'
css.appendChild(
  document.createTextNode(
    `* {
       -webkit-transition: none !important;
       -moz-transition: none !important;
       -o-transition: none !important;
       -ms-transition: none !important;
       transition: none !important;
    }`
  )
)
document.head.appendChild(css)
```

Note that we need to manually specify browser prefixes, as this CSS isn't run through any preprocessing.

After changing the theme (usually this involves toggling a class on `<body>`), we force a browser repaint and remove the stylesheet:

```js
// Toggle the theme here...

// Calling getComputedStyle forces the browser to redraw
const _ = window.getComputedStyle(css).opacity
document.head.removeChild(css)
```

Calling `requestAnimationFrame` before removing the stylesheet seemed to work at first, but it was unreliable and elements still transitioned. Using `getComputedStyle` works reliably on every major browser, because it forcibly [applies all active stylesheets](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).

Before:

![Toggling between light and dark theme, with elements flashing](/blog/disable-theme-transitions/before.gif)

After (or press <kbd>t</kbd> to try it yourself):

![Toggling between light and dark theme, with no elements flashing](/blog/disable-theme-transitions/after.gif)

---

Thanks to [Guillermo](https://twitter.com/rauchg) for the idea!
