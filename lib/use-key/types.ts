export type Keybind = string
export type Callback = (e: KeyboardEvent) => void
export type Modifier = 'control' | 'shift' | 'alt' | 'meta'

export interface Keybinds {
  [keybind: string]: Callback
}
