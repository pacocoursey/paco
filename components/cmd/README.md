# Command

[Command]() • [CommandInput]() • [CommandList]() • [CommandItem]() • [useCommand]()

At the simplest, a Command looks like this:

```js
const Example = () => {
  const commandProps = useCommand()

  return (
    <Command
      aria-label="Command menu"
      dialog={false}
      {...commandProps}
    >
      <CommandInput />
      <CommandList>
        <CommandItem value="No Priority">No Priority</CommandItem>
        <CommandItem value="Urgent">Urgent</CommandItem>
        <CommandItem value="High">High</CommandItem>
        <CommandItem value="Medium">Medium</CommandItem>
        <CommandItem value="Low">Low</CommandItem>
      </CommandList>
    </Command>
  )
}
```

## Installation

```js
yarn add colist
```

```js
import {
	Command,
	CommandInput,
	CommandList,
	CommandItem,
	useCommand
} from 'colist'
```

## Command

CSS selector:
`data-command` and optionally `data-command-overlay`

Required props:
Pass it everything returned from `useCommand`.

Optional props:
- `className` (string): class applied to the wrapper node
- `dialog` (boolean): whether to render the Command in a dialog
- `overlayClassName` (string): if rendered in a dialog, the class of the overlay
- `aria-label` (string): if rendered in a dialog, the label of the dialog
- `onDismiss` (function): if rendered in a dialog, the callback function when closed
- `ordering` (boolean): whether to automatically order items

## CommandInput

Must be rendered inside a `<Command>`.

CSS selector:
`data-command-input`

Required props:
None.

Optional props:
Any props will be spread to the `<input />` element. Also forwards `ref`.

## CommandList

Must be rendered inside a `<Command>`.

CSS selector:
`data-command-list` and `data-command-list-empty`

Required props:
None.

Optional props:
Any props will be spread to the `<ul />` element. Also forwards `ref`.

## CommandItem

Must be rendered inside a `<CommandList>`

CSS selector:
`data-command-item` and `aria-selected` when active

Required props:
- `value` (string): string to compare against for filtering and ordering

Optional props:
- `callback` (function): what to execute on click or selection

All other props will be made available on `commandProps.map.current`

## useCommand

```
const commandProps = useCommand(defaults)
```

Automatically handles all logic and state for efficiently rendering, filtering, and ordering items.

### defaults

- `search = ''` (string): initial value of the `<CommandInput>`
- `selected = 0` (number): index of initially selected item
- `open = false` (boolean): if rendered as a dialog, initially open or not
- `items = []` (any[]): an array of items that represent subsequent screens
- `ordering = true` (boolean): whether to automatically filter and order items

### Return Value (commandProps)

- `items` (any[]): an array of items that represent subsequent screens
- `search` (string): value of the input
- `open` (boolean): if rendered as a dialog, the open state
- `selected` (number): index of currently selected item
- `setSelected` (function): update currently selected item
- `list` (ref): list.current is an array of all visible items
- `map` (ref): map.current is a Map of all items and their associated props

