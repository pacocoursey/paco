# useDescendants ![npm bundle size](https://img.shields.io/bundlephobia/minzip/use-descendants)

> Warning: useDescendants is experimental and primarily intended for personal use. It heavily relies on refs and the DOM and likely will not be concurrent mode compatible.

useDescendants is a react hook for keeping track of descendant components and their relative indeces. It's based off the [@reach/descendants](https://www.npmjs.com/package/@reach/descendants) package, but is much faster and half the size, with no dependencies.

If you want to understand more about what this package does or why we need it, read the [Problem Complex](https://www.npmjs.com/package/@reach/descendants) from the @reach/descendants package.

In short, this package allows each item in a list to know it's relative index and the parent of the list can keep track of each child, without needing to render in a loop and pass each component an index.

This enables component composition:

```js
<List>
  <Item /> // I'm index 0
  <Item /> // I'm index 1<div>
    <div>
      <Item /> // I'm arbitrarily nested, but still know that I'm index 2
    </div>
  </div>
</List>
```

<br />

## Installation

```
$ yarn add use-descendants
```

<br />

## Example ([live](https://codesandbox.io/s/use-descendants-demo-wi96j?file=/src/App.js))

In this example, we'll create a menu with items that can be selected on hover.

```js
import {
  createDescendants,
  useDescendants,
  useDescendant
} from 'use-descendants'

const DescendantContext = createDescendants()
const MenuContext = createContext()

const Menu = ({ children }) => {
  const { ref, ...contextProps } = useDescendants()
  const [selected, setSelected] = useState(0)

  return (
    <DescendantContext.Provider value={contextProps}>
      <MenuContext.Provider value={{ selected, setSelected }}>
        <div role="menu" ref={ref}>
          {children}
        </div>
      </MenuContext.Provider>
    </DescendantContext.Provider>
  )
}

const MenuItem = ({ children }) => {
  const { selected, setSelected } = useContext(MenuContext)
  const { index, ref } = useDescendant(DescendantContext)

  const isSelected = index === selected

  return (
    <div
      role="menuitem"
      ref={ref}
      data-selected={isSelected}
      onMouseMove={() => setSelected(index)}
    >
      {children}
    </div>
  )
}
```

Pretty simple, right? The beauty of this API is that Menu's children can be wrapped arbitrarily, as opposed to normal rendering techniques.

```jsx
// Before
<Menu>
  {items.map(item => (
    <MenuItem>{item}</MenuItem>
  ))}
</Menu>
```

```jsx
// After, use any component tree
<Menu>
  <MenuItem>Hello</MenuItem>
  <BlogMenuItems />
  <RedItem>Im Red</RedItem>

  <>
    <>
      <>
        <MenuItem>Deep</MenuItem>
      </>
    </>
  </>
</Menu>
```

<br />

## Usage

There are two hooks: `useDescendants` (used in the parent) and `useDescendant` (used in each child). You will also need to use `createDescendants` to wrap each child with context.

### useDescendants

Maintains state related to the list of descendants.

```js
const { ref, ...contextProps } = useDescendants()

<ul ref={ref}>
  // ...
</ul>
```

The returned `ref` should be applied to the DOM element of your parent. The rest of the values returned from `useDescendants` should be passed via context.

The context props:

- `list`: a ref with an array of currently rendered descendants
- `map`: a ref with an object of every mounted (even if not rendered) descendant, keyed by component id
- `force`: a way to forcefully re-render the parent

Learn more about `list` and `map` in the [Advanced](#advanced) section.

### createDescendants

Creates a new descendant context.

```js
const DescendantContext = createDescendants()

<DescendantContext.Provider value={contextProps}>
 // ...
</DescendantContext.Provider>
```

The created context must be passed to `useDescendant` below.

### useDescendant

useDescendant accepts two arguments: `context`, the context you created with `createDescendants`, and `props`, arbitrary props that you want available in the parent.

Any props you pass will be available in the parent in `contextProps.map[id]`, where `id` is the component id returned below.

useDescendant returns three values:

- `ref` should be applied to the DOM element of this child.
- `index` is the relative index of this child in the list
- `id` is the unique id of this component

```js
const { ref, index, id } = useDescendant(context, props?)

<li ref={ref}>
 // ...
</li>
```

<br />

## Why?

To enable composable APIs instead of falling back to rendering data arrays. I prefer abstractions like `<select><option /></select>` instead of `<select options={[]} />`.

## Advanced

useDescendants heavily relies on refs to avoid unnecessary re-renders, which makes it about 3x faster than @reach/descendants because nothing is kept in state. We manually re-render the parent only when necessary.

It also heavily relies on the DOM. Under the hood, we use `document.querySelectorAll` to get all of the descendant DOM elements, and then keep an up-to-date list of their relative indeces.

This is because React provides no easy way of querying the component tree, and recursively checking `children` in the parent would be slow. But the DOM does provide an easy way to query the tree, and the DOM always represents the accurate state of our descendants.

Another downside of @reach/descendants was that any props passed to an item must be memoized. Passing an un-memoized function caused an infinite re-render. In useDescendants, you can pass any props, memoized or not, because we keep them in a ref.

### How it works

When a descendant is mounted, it is assigned a unique id and an index of -1. We wait for the item to mount the ref, then add the `[data-descendant]` attribute to the DOM element with the components unique id (i.e. `data-descendant="2h7g2b"`)

The parent list then queries the DOM for all elements with `[data-descendant]` and compares it to our list of descendants. If they are different, we update our list and re-render the parent. This re-renders all of the descendants, who can now compare their id to the list received from the parent via context. Now each descendant knows it's relative index to other descendants.

In the parent, we can use `list` and `map` to retrieve information about each descendant. For example, if we wanted the props of the fourth descendant, we can get the descendant id from the list and use it to lookup in the map:

```js
const id = list.current[3]
const props = map.current[id] // All of the props passed to `useDescendant` by the fourth descendant
```

This makes it easy to pass data from the children back up to the parent.

## Credits

- [@reach/descendants](https://www.npmjs.com/package/@reach/descendants) and [Chance](https://twitter.com/chancethedev), who introduced me to this concept
