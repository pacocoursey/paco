const scrollToTop = () => {
  if (!window) return

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

export default scrollToTop
