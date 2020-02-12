---
title: Custom text underlines
description: Implementing custom CSS text underlines that work with descenders and wrapping.
slug: custom-text-underlines
date: Feb 11, 2020
---

The `text-decoration: underline` CSS property provides insufficient control over the underline styling and position. While we wait for the [CSS Text Decoration Module specification](https://www.w3.org/TR/css-text-decor-4/) to become standard, we must rely on custom implementations.

My favorite approach is to use a `linear-gradient` to create an underline:

```css
background-image: linear-gradient(gray, gray);
background-size: 100% 1px;
background-position: left bottom;
background-repeat: no-repeat;
```

<div class="l">
  <div>
    <span>Day by day, what you do is what you become.</span>
  </div>
</div>

## Position

Position the underline by changing the vertical value of `background-position`:

```css
background-position: left 1.05em;
```

<div class="l _2">
  <div>
    <span>Day by day, what you do is what you become.</span>
  </div>
</div>

## Descenders

You'll notice that the underline overlaps the [descenders](https://www.figma.com/dictionary/descender/) of the text. By adding a `text-shadow` with a small offset to the right and left with the color of the background, you can hide the underline around descenders.

```css
text-shadow: 0.1em 0 var(--background), -0.1em 0 var(--background);
```

<div class="l _2 _3">
  <div>
    <span>Day by day, what you do is what you become.</span>
  </div>
</div>

Remember to set `text-shadow: none` in your `::selection` rules.

## Weight

Change the height of the background to increase the underline weight:

```css
background-size: 100% 0.25em;
```

<div class="l _4">
  <div>
    <span>Day by day, what you do is what you become.</span>
  </div>
</div>

## Dashes

By using a `repeating-linear-gradient` and leaving half the gradient transparent, you can customize a dashed underline:

```css
background-image: repeating-linear-gradient(
  to right,
  var(--gray) 0%,
  var(--gray) 50%,
  transparent 50%,
  transparent 100%
);
background-size: 1ch 1px;
```

<div class="l _5">
  <div>
    <span>Day by day, what you do is what you become.</span>
  </div>
</div>

Change the horizontal value of `background-size` to modify the dash width:

```css
background-size: 5ch 1px;
```

<div class="l _5 _6">
  <div>
    <span>Day by day, what you do is what you become.</span>
  </div>
</div>

The `ch` unit is equal to the width of the "0" glyph in the current font, which can be useful for natural alignment.

## Wrapping

Lastly, this approach also supports multi-line text:

<div class="l">
  <div>
    <span>Day by day,<br /> what you do is what you become.</span>
  </div>
</div>

[Let me know](https://twitter.com/pacocoursey) if you end up using this, or read more about other approaches in "[Crafting link underlines on Medium.](https://medium.design/crafting-link-underlines-on-medium-7c03a9274f9)"

---

Thanks to [Franco](https://twitter.com/arzafran) for reminding me about this technique!

<style>

.l {
  background: var(--lighter-gray);
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--radius);
  font-size: 1.25rem;
  color: var(--fg);
  text-align: center;
}

.l span {
  background-image: linear-gradient(var(--gray), var(--gray));
  background-size: 100% 1px;
  background-position: left bottom;
  background-repeat: no-repeat;
}

.l._2 span {
  background-position: left 1.05em;
}

.l._3 span {
  text-shadow: 0.1em 0 var(--lighter-gray), -0.1em 0 var(--lighter-gray);
}

.l._4 span {
  background-size: 100% 0.25em;
}

.l._5 span {
  background: repeating-linear-gradient(
    to right,
    var(--gray) 0%,
    var(--gray) 50%,
    transparent 50%,
    transparent 100%
  );
  background-repeat: repeat-x;
  background-size: 1ch 1px;
  background-position: bottom left;
}


.l._6 span {
  background-size: 2ch 1px;
}
</style>
