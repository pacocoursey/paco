const getPostsMeta = posts => {
  const bins = {}
  posts.forEach(p => {
    const { body, ...rest } = p // eslint-disable-line
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

  return Object.entries(bins)
}

export default getPostsMeta
