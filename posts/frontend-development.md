---
title: Frontend Development
description: Why is it so hard to build websites?
slug: frontend-development
date: April 13, 2020
---

Benjamin De Cock posted an interesting [Tweet](https://twitter.com/bdc/status/1249597086007345157?s=20) about frontend developers the other day. I disagree with everything he said.

> The title "frontend developer" is obsolete. These profiles are good at JS, but not at other things contributing to great frontend experiences.

This doesn't mean the term frontend developer is obsolete, it means people are using it incorrectly.

I call myself a frontend developer, with the implication that I work on all things related to building UI, or building tools to build UI. This includes HTML, JS, CSS, and knowledge of topics like accessibility, performance, user experience, and design.

It's also weird to call out people who only write JavaScript, when the last few years of web development have been all about moving our markup and CSS into JS (React, Vue, Svelte are all examples of moving HTML into JS, and Styled Components, Emotion, and styled-jsx are all examples of moving CSS into JS).

> frontend developers have an abysmal knowledge of CSS

Really? I would like to meet the developer that calls themselves a frontend developer without advanced knowledge of CSS. What are you using to build the "front"? If you don't know CSS fairly well, then you probably aren't a good frontend developer (sorry).

> terrible touch-based sliders performing poorly because they were not using CSS Snap Points

We wrote these sliders using JavaScript because the CSS APIs were so poor! CSS Scroll Snap was first proposed <sup>1</sup> in January 2019 and only recently became widely supported. People have been developing touch applications with a need for sliders for over 10 years! It's unreasonable to expect that every website will have updated to the newest, shiny CSS feature that, let's face it, probably doesn't work in at least one browser (at time of writing, many properties [don't work on Safari](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-top#Browser_compatibility)).

Additionally, it's hard to keep track of every CSS feature. I consistently learn something new about CSS every day. Someone even responded to this Tweet saying they didn't know what the API was called:

> I was thinking on how to implement some kind of scroll snap points on a project that I am doing, but had no clue how it was called.

But the basic JS APIs around DOM manipulation (like `scrollLeft`, `offsetWidth`) are reliable and work everywhere, where CSS may not.

> custom form elements being totally inaccessible because the devs didn't know how to override default styles

In some cases like `<select>`, you still can't override the default styles! Also, [many of the default browser form components are inaccessible](https://daverupert.com/2020/02/html-the-inaccessible-parts/)! This isn't to mention a huge of lack of browser elements that we would expect to be included by now: modal, slider, tooltip, popup, typeahead input, custom select, drawer, accordion, etc...

We _must_ use JS to implement these elements. Often, our implementations are really bad, because it takes literally months to do it right. And unless you're a developer working full-time on a component library, we're lucky if we get to spend more than 3 days on a single component.

Devon Govett only recently completed what looks like the first correctly implemented, accessible [custom `<select>` component](https://twitter.com/devongovett/status/1248304777588441088?s=20), and it took him weeks. I still have doubts that it won't weigh 60kb and work poorly on mobile.

> the jarring sticky navs not using native positioning

If [browsers supported table headers]() being sticky, we would use `position: sticky` more! Come on, that's the second most common use case behind sticky navigation headers. Shu Ding even came up with a different [CSS only solution](https://twitter.com/shuding_/status/1148721530496380930?s=20) to solve this exact problem.

Where's the support for common header UI patterns like hiding or showing the header as you scroll down or up? Sticky is great, but it does not remove the need for JS.

> the janky custom JS anchor scrolling because the devs didn't know about CSS scroll-behavior

Have you ever used anchor links on a very long page that uses `scroll-behavior: smooth`? It takes about 3 seconds to scroll. That's an awful user experience when animations should almost always be [less than half a second](https://material.io/design/motion/speed.html#duration). Where is `scroll-behavior-speed`? Where is `scroll-behavior-timing-function`? Give me the [rest of the fucking owl](https://external-preview.redd.it/DodWFQ9mQkVyWoKFa0ZIu12PYrPo3P2T0taaK-lgJCo.png?width=530&auto=webp&s=034d71021191d7e4229efddf6d0df1e60e5f6477).

---

Thinking about this really makes my blood boil. Writing good, accessible frontend experiences is _damn_ hard when you consider browser bugs, browser and operating system support of new features, and the thousands of web APIs. In a lot of cases, custom JS is our only option.
