import { memo, useRef, useEffect, Fragment } from 'react'
import cn from 'classnames'
import styles from './command.module.css'

const divider = <li className={styles.divider} />

// These children should not change often
const Label = memo(({ children }) => {
  return <li className={styles.label}>{children}</li>
})

Label.displayName = 'Label'

const Item = ({
  active,
  icon,
  name,
  callback,
  onMouseMove,
  keybind,
  divider: hasDivider,
  index
}) => {
  const itemRef = useRef()

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
      {hasDivider && divider}
      <li
        ref={itemRef}
        className={cn(styles.item, { [styles.active]: active })}
        onClick={callback}
        onMouseMove={onMouseMove}
        role="option"
        tabIndex={-1}
        data-command-option-index={index}
        aria-selected={active}
      >
        <div className={styles.left}>
          <span className={styles.icon}>{icon}</span>
          <span>{name}</span>
        </div>

        {keybind && (
          <span className={styles.keybind}>
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

const renderItem = ({ item, index, ...rest }) => {
  if (item.collection) {
    return (
      <Fragment key={`command-collection-${item.name}-${index}`}>
        <Label>{item.name}</Label>
        {item.items.map((subItem, i) =>
          renderItem({ item: subItem, index: index + i, ...rest })
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
    />
  )
}

const renderItems = ({ items, active, setActive, callback }) => {
  let count = 0

  return items.map(item => {
    const x = renderItem({
      item,
      index: count,
      active,
      setActive,
      callback
    })

    if (item.collection) {
      count += item.items.length
    } else {
      count++
    }

    return x
  })
}

export default renderItems
