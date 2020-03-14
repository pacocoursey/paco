import fs from 'fs'
import path from 'path'

const getPostsMeta = posts => {
  const metadata = []
  const bins = {}
  posts.forEach(p => {
    const { body, ...rest } = p // eslint-disable-line
    metadata.push(rest)
    const d = new Date(p.date)
    const displayDate = `${d.toLocaleString('default', {
      year: 'numeric',
      month: 'long'
    })}`

    if (!bins[displayDate]) {
      bins[displayDate] = [rest]
    } else {
      bins[displayDate].push(rest)
    }
  })

  fs.writeFileSync(
    path.resolve(process.cwd(), 'data/blog.json'),
    JSON.stringify(metadata)
  )

  return Object.entries(bins)
}

export default getPostsMeta
