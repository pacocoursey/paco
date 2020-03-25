---
title: CSS Previous Sibling Selector
description: CSS trick to style preceding elements using flexbox and order.
slug: css-previous-sibling-selector
date: Mar 24, 2020
---

There is no previous sibling selector in CSS. Instead, we can achieve the same behavior by using flexbox and the `order` property.

Let's say you're adding a prefix to an input, and would like to style the prefix when the input is focused. If you read from left to right and top to bottom (English), you likely structure your DOM like that too:

```html
<div class="container">
  <div class="prefix">https://</div>
  <input type="text" />
</div>
```

<div class="example">
  <div class="container">
    <div class="prefix">https://</div>
    <input type="text" />
  </div>
</div>

In this markup, there's no way to target the `.prefix` class using `input:focus`, because we have no preceding selector. Instead, we can rewrite the DOM structure so that prefix appears _after_ the input:

```html
<div class="container">
  <input type="text" />
  <div class="prefix">https://</div>
</div>
```

And use flexbox to change the order of appearance:

```css
.container {
  display: flex;
}

.container input {
  order: 1;
}

.container .prefix {
  order: 2;
}
```

Now you can select the prefix using the sibling selector:

```css
.container input:focus + .prefix {
  /* Focus styles... */
}
```

<div class="example">
  <div class="container fixed">
    <input type="text" />
    <div class="prefix">https://</div>
  </div>
</div>

In the case of an input, the simple solution is to use [`:focus-within`](https://caniuse.com/#search=focus-within), which has good browser support but is still experimental. Maybe you have other use cases for this trick though, [let me know](https://twitter.com/pacocoursey)!

---

This post is inspired by my own work on inputs, and this paragraph:

> Unfortunately, trying to use `:focus` limits what you can do: you can style the input or siblings that come after the input… but that’s it.
> — [Initializing focus state in React](https://exogen.github.io/blog/focus-state)

<style>
  .example {
    border-radius: var(--radius);
    background: var(--lighter-gray);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--gap);
  }

  .example .container {
    display: flex;
    align-items: center;
  }

  .example input {
    height: 2.5rem;
    font-size: 1rem;
    border-radius: 0 var(--inline-radius) var(--inline-radius) 0;
    background: var(--bg);
    color: var(--fg);
    border: 1px solid var(--light-gray);
    padding: 0 var(--gap-half);
    outline: none;
    transition: border-color var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }

  .example input:focus {
    border-color: var(--gray);
  }

  .example .prefix {
    background: var(--lightest-gray);
    border-radius: var(--inline-radius) 0 0 var(--inline-radius);
    padding: 0 var(--gap-half);
    height: 2.5rem;
    font-size: 1rem;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--light-gray);
    border-right: 0;
    user-select: none;
    color: var(--gray);
    transition: color var(--transition);
    margin: 0;
  }

  .example .container.fixed input {
    order: 1;
  }

  .example .container.fixed .prefix {
    order: 0;
  }

  .example .container.fixed input:focus + .prefix {
    color: var(--fg);
  }
</style>
