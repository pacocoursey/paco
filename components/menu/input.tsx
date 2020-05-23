import { ChangeEvent } from "react"

interface InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({ onChange }) => {
  // useKeyDown()

  return <input type="text" onChange={onChange} />
}

export default Input

// function useKeyDown() {
//   const { descendants } = useContext(DescendantContext)

//   console.log(descendants)

//   // useEffect(() => {
//   //   const handleKeyDown = (e: KeyboardEvent) => {
//   //     if (e.key === 'ArrowDown') {
//   //     }
//   //   }

//   //   window.addEventListener('keydown', handleKeyDown)
//   //   return () => window.removeEventListener('keydown', handleKeyDown)
//   // }, [])
// }
