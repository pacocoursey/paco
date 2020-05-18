---
title: Custom CSS via Serverless Proxy
description: Adding arbitrary styles to a website without browser extensions.
slug: custom-css-via-proxy
date: May 17, 2020
og: true
---

If you want to add custom CSS to a website without using a [browser extension](https://userstyles.org/), you can proxy the site using a serverless function and inject a new stylesheet.

I love [Aaron Swartz's blog](http://aaronsw.com/weblog/archive), but the font size is tiny, the content is not centered, and the colors aren't late-night friendly. Let's improve it.

Create `api/index.js` and add a server-side fetching library like [node-fetch](https://github.com/node-fetch/node-fetch):

```js
const fetch = require('node-fetch')

module.exports = (req, res) => {
  res.end()
}
```

Fetch the HTML of the actual site:

```js
module.exports = (req, res) => {
  const html = (
    await (await fetch('http://aaronsw.com' + req.url)).text()
  )
  res.end()
}
```

Add a `link` tag to the head:

```js
const html = (
  await (await fetch('http://aaronsw.com' + req.url)).text()
).replace(
  '</head>',
  '<link media="all" href="/custom.css" rel="stylesheet" /></head>"
)
```

Return the modified HTML. Use `.send` instead of passing the string to `.end` so that the correct content headers are set.

```js
res.send(html)
```

If the website content you're proxying doesn't update frequently, you should add caching of your serverless function's response. Aaron passed away a few years ago, so his blog isn't updated anymore.

The final function looks like this:

```js
const fetch = require('node-fetch')

module.exports = async (req, res) => {
  const html = (
    await (await fetch('http://aaronsw.com' + req.url)).text()
  ).replace(
    '</head>',
    '<link media="all" href="/custom.css" rel="stylesheet" /></head>'
  )

  // 1 year
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=31536000')

  res.send(html)
  res.end()
}
```

Add your custom CSS in a `custom.css` file.

## Deploy

Create a `vercel.json` configuration file that rewrites all requests to your deployment through our `api/index` serverless function:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/api" }]
}
```

Deploy with Vercel:

```bash
$ vercel
```

Visit your deployment to see the proxy in action. My Aaron Swartz blog proxy is available here: [aaronsw.now.sh/weblog/archive](https://aaronsw.now.sh/weblog/archive).

