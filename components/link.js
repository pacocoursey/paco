import NextLink from 'next/link'

const canPrefetch = href => {
  if (!href || !href.startsWith('/')) {
    return false
  }

  return true
}

const Link = ({ external, href, as, passHref, children, ...props }) => {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="reset"
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <>
      <NextLink
        href={href}
        as={as}
        prefetch={canPrefetch(href) ? undefined : false}
        passHref={passHref}
      >
        {passHref ? children : <a {...props}>{children}</a>}
      </NextLink>
    </>
  )
}

export default Link
