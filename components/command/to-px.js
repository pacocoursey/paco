const toPx = x => {
  if (typeof x === 'string') {
    return x
  }

  return `${x}px`
}

export default toPx
