import { useRef, useEffect, useContext } from 'react'
import { useDescendant } from '@reach/descendants'
import matchSorter from 'match-sorter'
import cn from 'classnames'

import defaultStyles from './command.module.css'
import { Styles } from './types'
import { DescendantContext, MenuContext } from './index'

export interface ItemProps {
  value: string
  callback: () => void
  styles?: Styles
}

const Item: React.FC<ItemProps> = ({
  value,
  children,
  callback,
  styles = {}
}) => {
  const { active, setActive, search } = useContext(MenuContext)
  const itemRef = useRef<HTMLLIElement>(null)

  // The value of this item doesn't match the search query,
  // don't render it in the list
  const shouldRender = matchSorter([value], search).includes(value)

  const index = useDescendant({
    element: itemRef.current,
    // @ts-ignore
    context: DescendantContext,
    callback
  })

  const isActive = active === index

  useEffect(() => {
    // This item has become active, scroll it into view
    if (isActive && itemRef.current) {
      itemRef.current.scrollIntoView({
        block: 'nearest'
      })
    }
  }, [isActive])

  const setThisItemActive = () => {
    requestAnimationFrame(() => {
      if (!isActive) {
        setActive(index)
      }
    })
  }

  if (!shouldRender) {
    return null
  }

  return (
    <li
      ref={itemRef}
      className={cn(
        defaultStyles.item,
        styles.item,
        {
          [defaultStyles.active]: isActive
        },
        styles.itemActive ? { [styles.itemActive]: isActive } : null
      )}
      onClick={callback}
      onMouseMove={setThisItemActive}
      role="option"
      tabIndex={-1}
      aria-selected={isActive}
    >
      {children}
    </li>
  )
}

export default Item
