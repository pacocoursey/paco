---
title: Styled System with styled-jsx
description: styled-jsx-system is a way to use Styled System with styled-jsx.
slug: styled-jsx-system
date: Dec 21, 2019
og: true
---

[Styled System](https://styled-system.com/) is an excellent alternative to writing ad-hoc `style` declarations in your React components. By giving components standardized props like `bg` and `fontSize`, it's easier to build custom UI that respects your system constraints. That's because you can quickly specify your design tokens and use them in real code:

```js
// theme.js
colors: {
  blue: '#0070F3'
}

// your React code
<Box color="blue" />
```

Styled System's responsive syntax is impressively concise, too:

```js
// 16px on mobile, 14px on tablet, 12px on desktop
<Box fontSize={[16, 14, 12]} />
```

These two features make it extremely easy to scaffold new components.

I want to use Styled System with [styled-jsx](https://github.com/zeit/styled-jsx), because styled-jsx is included with [Next.js](https://github.com/zeit/next.js), and I use Next.js for everything React. But all the Styled System tooling I found was for styled-components or Emotion, so I made my own.

## styled-jsx-system

[styled-jsx-system](https://github.com/pacocoursey/styled-jsx-system) lets you use Styled System with styled-jsx.

```bash
$ yarn add styled-jsx-system
```

Wrap your components with the provided HOC and accept a `className` prop:

```js
import withStyledSystem from 'styled-jsx-system'
import { color } from 'styled-system'

const Box = ({ className, children }) => {
  return (
    <div className={className}>
      {children}

      <style jsx>{`
        div {
          padding: 8px;
        }
      `}</style>
    </div>
  )
}

export default withStyledSystem(Box, [color])
```

That's it! You can now use Styled System props with your Box component:

```js
<Box color={['#000', '#666', '#fff']}>Hello</Box>
```

Other Styled System features like compose, system, and themeing are supported too. Check out the [repository](https://github.com/pacocoursey/styled-jsx-system) for more information.

Cool. [Let me know](https://twitter.com/pacocoursey) if you end up using it.

---

Thanks to [jxnblk](https://twitter.com/jxnblk) for Styled System and all his cool CSS experiments, and thanks to [Giuseppe](https://twitter.com/giuseppegurgone), [JJ](https://twitter.com/_ijjk), and [Shu](https://twitter.com/shuding_) for help with compiling and publishing!
