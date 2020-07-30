import { useState } from 'react'

const Item = ({ search, i }) => {
  return <li>item {i} - {search}</li>
}

const list = Array(200).fill(0)

const Test = () => {
  const [search, setSearch] = useState('')

	return (
    <>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      {list.map((_, i) => {
        return <Item search={search} key={i} i={i} />
      })}
    </>
	)
}

export default Test
