import { useContext, useRef } from 'react'
import matchSorter from 'match-sorter'
import { MenuContext, TestContext, useTest } from './index'

const Item = ({ value, onClick, children }) => {
  const { active, setActive, search } = useContext(MenuContext)
  const ref = useRef(null)

  const shouldRender = matchSorter([value], search).includes(value)

  const index = useTest({
    value,
    context: TestContext,
    active: shouldRender
  })

  const select = () => {
    requestAnimationFrame(() => {
      if (index !== active) {
        setActive(index)
      }
    })
  }

  if (index !== -1) {
    console.log(value, index)
  }

  if (!shouldRender) {
    return null
  }

  return (
    <div
      aria-selected={index === active}
      ref={ref}
      onClick={() => {
        select()
        onClick?.()
      }}
      onMouseMove={select}
      style={{ color: index === active ? 'red' : undefined }}
    >
      {children}
    </div>
  )
}

export default Item
