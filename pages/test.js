import useTheme from "@lib/theme"
import Button from "@components/button"

const Test = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <h1>Theme is {JSON.stringify(theme)}</h1>
      <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Toggle the Theme</Button>
      <SubComp />
    </div>
  )
}

function SubComp() {
  const { theme } = useTheme()

  return (
    <h3>Sub component theme is: {JSON.stringify(theme)}</h3>
  )
}

export default Test
