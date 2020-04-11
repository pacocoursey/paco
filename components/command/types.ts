import { Keybind } from "./key-handler";

export interface CallbackOptions {
  clear?: boolean
  bounce?: boolean
  close?: boolean
}

export interface BaseItem {
  name: string
  icon?: React.ReactNode
  keybind?: Keybind
  callback: () => void
  onCallback?: CallbackOptions
  divider?: boolean
}

export interface CollectionItem extends BaseItem {
  collection: true
  items: Items
}

export type Item = BaseItem | CollectionItem
export type Items = Item[]

export interface Props {
  open?: boolean
  items: Items
  max?: number
  height?: number,
  width?: number,
  top?: React.ReactNode
  placeholder?: string
  keybind?: Keybind
  searchOn?: string[]
  onClose?: () => void
}

export interface State {
  open: boolean
  active: number
  items: Items
}

export type Action =
  | { type: 'close' }
  | { type: 'open' }
  | { type: 'update', items: Items }
  | { type: 'setActive', active: number }
  | { type: 'reset', items: Items }
  | { type: 'updateInPlace', items: Items }
