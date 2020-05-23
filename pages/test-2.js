import Popover, { usePopover } from '@components/popover'

const Test = () => {
  const [state, dispatch] = usePopover(false)

  return (
    <div>
      <button onClick={() => {
        if (state.active) {
          dispatch({ type: 'close' })
        } else {
          dispatch({ type: 'open' })
        }
      }}>Toggle Popover</button>
      <Popover active={state.active}>inside content</Popover>
    </div>
  )
}

export default Test
