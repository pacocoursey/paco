---
title: SVG Caching with <use>
description: Smaller DOM size by reusing existing SVG icons
slug: svg-caching-with-use
date: June 25, 2020
og: https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dpaco%26title%3DSVG%2520Caching%2520with%2520%253Cuse%253E%23
---

I had an idea for caching SVG paths. Not the usual kind of async request caching of remote SVGs, but local re-use of DOM elements that have already rendered.

SVG's [`<use>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use) element allows re-use of an existing DOM element, without manually duplicating the node. It works like this:

```html
<!-- Add an id to the element -->
<svg>
  <circle id="circle" cx="5" r="5" fill="black" />
</svg>

<!-- Pass the id as href to <use> -->
<svg>
  <use href="#circle" />
</svg>

<!-- The same SVG renders twice -->
```

## Setup

When using an icon set like [Feather](https://feathericons.com/) in React, I prefer to use a higher-order component (HOC) and a generic `Icon` component to render each icon with consistent properties. We'll use this HOC to demonstrate SVG caching:

```jsx
import { memo } from 'react'

const withIcon = (icon, opts) => {
  const Icon = props => {
    const { size = 24, color = 'currentColor' } = props

    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        stroke="currentColor"
        style={{
          color
        }}
        dangerouslySetInnerHTML={{
          __html: icon
        }}
      />
    )
  }

  return memo(Icon)
}

export default withIcon
```

Each icon is simply the SVG contents wrapped with the HOC:

```jsx
const ArrowLeft = withIcon('<path d="M21 12H3m0 0l6.146-6M3 12l6.146 6" />')
```

## Caching

We'll use React context to add an icon cache. First, create a new context and the appropriate hook to access it:

```jsx
export const IconCache = React.createContext(null)
export const useIconCache = () => React.useContext(IconCache)
```

Setup the provider at the application root. The cache will be a plain, empty object where each key is the icon string and each value is the cached id.

```jsx raw
const App = () => (
  <IconCache.Provider value={{}}>{/* ... */}</IconCache.Provider>
)
```

Inside of `Icon`, read the cache from context and check if this icon has a cached id. If not, generate the new id and add it to the cache:

```jsx
const cache = useIconCache()

let cachedId = cache[icon]

if (!cachedId) {
  cachedId = `icon-` + hash(icon).toString(16)
  cache[icon] = cachedId
}
```

Generate a stable id by hashing the icon using the [fnv1a](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function) <a href="#footnote"><sup>1</sup></a> algorithm (commonly used in CSS-in-JS libraries) and then converting it to hexadecimal for a smaller string:

```jsx
import hash from 'fnv1a'
```

If we have a cached id, we can render the `<use>` tag instead of inserting the entire icon again. If this icon has not rendered before, wrap it in a group tag and attach the unique id.

```jsx highlight=11-13
return (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    style={{
      color
    }}
    dangerouslySetInnerHTML={{
      __html: cachedId
        ? `<use href="#${cachedId}" />`
        : `<g id="${id}">${icon}</g>`
    }}
  />
)
```

## Conclusion

Here's our new `withIcon` HOC with caching:

```jsx highlight=2,4-5,10,12,13,15-18,30-32
import { memo } from 'react'
import hash from 'fnv1a'

export const IconCache = React.createContext({})
export const useIconCache = () => React.useContext(IconCache)

const withIcon = icon => {
  const Icon = props => {
    const { size = 24, color = 'currentColor' } = props
    const cache = useIconCache()

    const cachedId = cache[icon]
    let id

    if (!cachedId) {
      id = 'icon-' + hash(icon).toString(16)
      cache[icon] = id
    }

    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        stroke="currentColor"
        style={{
          color
        }}
        dangerouslySetInnerHTML={{
          __html: cachedId
            ? `<use href="#${cachedId}" />`
            : `<g id="${id}">${icon}</g>`
        }}
      />
    )
  }

  return memo(Icon)
}

export default withIcon
```

Rendering the same icon multiple times will reuse existing DOM elements, decreasing the size of your HTML:

```jsx raw
/* React */

<IconCache.Provider value={{}}>
  <ArrowLeft />
  <ArrowLeft />
  <ArrowLeft />
</IconCache.Provider>

/* HTML Output:
  <svg>
    <g id="icon-dacb5a47"><path d="M21 12H3m0 0l6.146-6M3 12l6.146 6" /></g>
  </svg>

  <svg>
    <use href="#icon-dacb5a47" />
  </svg>

  <svg>
    <use href="#icon-dacb5a47" />
  </svg>
*/
```

In this example, the cached version is about 40% fewer characters!

You can still customize each icon, because the props apply to the outer svg element and don't involve the inner elements at all:

```jsx
<ArrowLeft />
<ArrowLeft size={30} color="blue" />
<ArrowLeft size={50} color="red" />
```

---

Here's a [live demo](https://svgcache.vercel.app) and the [demo source code](https://github.com/pacocoursey/svgcache).

<div id="footnote"></div>

1. You don't have to use fnv1a, any stable id generation technique will work. Just make sure it's consistent between server and client to avoid hydration mismatch.
