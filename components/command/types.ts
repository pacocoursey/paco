import { Keybind } from './key-handler'

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

export interface Styles {
  screen?: string
  command?: string
  onExiting?: string
  top?: string
  input?: string
  noResults?: string
  list?: string

  item?: string
  itemActive?: string

  icon?: string
  keybind?: string
  label?: string
  divider?: string
}

export interface Props {
  open?: boolean
  items: Items
  max?: number
  height?: number
  labelHeight?: number
  width?: number
  top?: React.ReactNode
  placeholder?: string
  keybind?: Keybind
  searchOn?: string[]
  onClose?: () => void
  styles?: Styles
}

export interface State {
  open: boolean
  active: number
  items: Items
}

export type Action =
  | { type: 'close' }
  | { type: 'open' }
  | { type: 'update'; items: Items }
  | { type: 'setActive'; active: number }
  | { type: 'reset'; items: Items }
  | { type: 'updateInPlace'; items: Items }
