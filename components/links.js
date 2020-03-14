import { memo } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import Link from '@components/link'

const Links = ({ schema, filter }) => {
  const { pathname } = useRouter()

  return (
    <div className="flex">
      <Link
        href={pathname}
        className={cn('l-t', 'invert', { active: !filter })}
      >
        All
      </Link>
      {Object.values(schema).map(k => {
        return (
          <Link
            key={k.name}
            href={`${pathname}?filter=${encodeURIComponent(k.name)}`}
            as={pathname}
            className={cn('l-t', k.color, {
              active: filter === k.name
            })}
          >
            {k.name}
          </Link>
        )
      })}
    </div>
  )
}

export default memo(Links)
