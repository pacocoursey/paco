const toPx = (x: string | number) => {
  if (typeof x === 'string') {
    return x
  }

  return `${x}px`
}

export default toPx
