---
title: Shared Hook State with SWR
description: Using useSWR to share state between hook calls.
slug: shared-hook-state-with-swr
date: May 9, 2020
og: true
---

[SWR](https://github.com/zeit/swr) is a React hook for data fetching that features a cache for requests. This is generally used to share the response from API calls and deduplicate requests, but SWR is flexible enough to support another use case: shared hook state. <a href="#footnote"><sup>1</sup></a>

Let's look at an example of a `useUsername` hook:

```js
const useUsername = () => {
  return useState('')
}

const UsernameInput = () => {
  const [username, setUsername] = useUsername()

  return (
    <div>
      <input value={username} onChange={setUsername} />
    </div>
  )
}

const DisplayUsername = () => {
  const [username] = useUsername()

  return (
    <span>Username: {username}</span>
  )
}
```

This won't work, because each time we call `useUsername`, we receive a new instance of state. Updating the input won't affect what our `DisplayUsername` component renders.

### Solving with Context

With React context, we typically lift the username state to the highest level and `useContext` to read the value in our components:

```js
const UsernameContext = createContext()

const App = () => (
  <UsernameProvider>
    {/* ... */}
  </UsernameProvider>
)

const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState('')

  return (
    <UsernameContext.Provider value={[username, setUsername]}>
      {children}
    </UsernameContext.Provider>
  )
}

const DisplayUsername = () => {
  const [username] = useContext(UsernameContext)

  return (
    <span>Username: {username}
  )
}
```

This will work, but in big applications you'll end up with a lot of context.

## Solving with SWR

We can simulate `useState` with SWR by using the [`mutate`](https://swr.vercel.app/docs/mutation) function as our `setState`, and the [`config.fallbackData`](https://swr.vercel.app/docs/options#options) option as the initial state. Now when we call `mutate`, the updated data will be reflected everywhere the hook is used.

```js
import useSWR from 'swr'

const useUsername = () => {
  const { data: username, mutate: setUsername } = useSWR('username', {
    fallbackData: ''
  })

  return [username, setUsername]
}
```

It works, no context required. Every `useUsername` will share the same state, and calling `setUsername` will update the state across all uses of the hook.

### useSharedState

We can go one step further and build a shared addition to `useState`:

```js
const useSharedState = (key, initial) => {
  const { data: state, mutate: setState } = useSWR(key, {
    fallbackData: initial
  })

  return [state, setState]
}
```

Use it like `useState`, but pass a key as the first argument:

```js
const [username, setUsername] = useSharedState('username', 'paco')
const [os, setOS] = useSharedState('os', 'macos')
```

SWR is mainly used to manage remote data requests, but it also provides a powerful cache and API that you can use to share local state between hooks. Kudos to [Shu](https://twitter.com/shuding_) for his excellent work!

---

<div id="footnote"></div>

1. Two components using the same React hook [**don't share state by default**](https://reactjs.org/docs/hooks-custom.html#:~:text=Do%20two%20components%20using%20the%20same%20Hook%20share%20state).

2. SWR uses a client-side only cache, so your data won't persist between sessions or windows unless you keep external state like `localStorage`, at which point SWR may not be useful.
