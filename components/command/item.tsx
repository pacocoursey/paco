import { memo, useRef, useEffect, Fragment } from 'react'
import cn from 'classnames'
import defaultStyles from './command.module.css'
import { Keybind } from './key-handler'
import { Item as ItemType, Items, Styles } from './types'

interface ItemProps {
  name: string
  icon?: React.ReactNode
  onMouseMove: () => void
  keybind?: Keybind
  divider?: boolean
  index: number
  callback: () => void
  active: boolean
  styles: Styles
}

interface SharedProps {
  active: number
  setActive: (index: number) => void
  callback: (index: number) => void
  styles: Styles
}

interface RenderItemProps extends SharedProps {
  item: ItemType
  index: number
}

interface RenderItemsProps extends SharedProps {
  items: Items
}

const Divider: React.FC<{ className?: string }> = memo(({ className }) => (
  <li className={cn(defaultStyles.divider, className)} />
))

// These children should not change often
const Label: React.FC<{ className?: string }> = memo(
  ({ className, children }) => {
    return <li className={cn(defaultStyles.label, className)}>{children}</li>
  }
)

Label.displayName = 'Label'

const Item = ({
  active,
  icon,
  name,
  callback,
  onMouseMove,
  keybind,
  divider: hasDivider,
  index,
  styles = {}
}: ItemProps) => {
  const itemRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    // This item has become active, scroll it into view
    if (active && itemRef.current) {
      itemRef.current.scrollIntoView({
        block: 'nearest'
      })
    }
  }, [active])

  return (
    <>
      {hasDivider && <Divider className={styles.divider} />}
      <li
        ref={itemRef}
        className={cn(
          defaultStyles.item,
          styles.item,
          {
            [defaultStyles.active]: active
          },
          styles.itemActive ? { [styles.itemActive]: active } : null
        )}
        onClick={callback}
        onMouseMove={onMouseMove}
        role="option"
        tabIndex={-1}
        data-command-option-index={index}
        aria-selected={active}
      >
        <div className={defaultStyles.left}>
          <span className={cn(defaultStyles.icon, styles.icon)}>{icon}</span>
          <span>{name}</span>
        </div>

        {keybind && (
          <span className={cn(defaultStyles.keybind, styles.keybind)}>
            {keybind.includes(' ') ? (
              keybind.split(' ').map((key, i) => {
                return <kbd key={`item-${name}-keybind-${key}-${i}`}>{key}</kbd>
              })
            ) : (
              <kbd>{keybind}</kbd>
            )}
          </span>
        )}
      </li>
    </>
  )
}

const renderItem = ({ item, index, styles, ...rest }: RenderItemProps) => {
  if ('collection' in item) {
    return (
      <Fragment key={`command-collection-${item.name}-${index}`}>
        <Label className={styles.label}>{item.name}</Label>
        {item.items.map((subItem, i) =>
          renderItem({ item: subItem, index: index + i, styles, ...rest })
        )}
      </Fragment>
    )
  }

  const { active, setActive, callback } = rest

  return (
    <Item
      {...item}
      key={`command-option-${item.name}-${index}`}
      index={index}
      active={active === index}
      onMouseMove={() => setActive(index)}
      callback={() => callback(index)}
      styles={styles}
    />
  )
}

const renderItems = ({ items, ...props }: RenderItemsProps) => {
  let count = 0

  return items.map(item => {
    const x = renderItem({
      item,
      index: count,
      ...props
    })

    if ('collection' in item) {
      count += item.items.length
    } else {
      count++
    }

    return x
  })
}

export default renderItems
