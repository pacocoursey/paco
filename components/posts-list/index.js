import { useState } from 'react'
import cn from 'classnames'

import Link from '../link'
import styles from './posts-list.module.css'

const P = ({ content, slug }) => {
  return content.map(([month, list], j) => {
    return (
      <div key={`${month}-${list.length}-${j}`} className={styles.group}>
        <span className={styles.month}>{month}</span>

        <div className={styles.posts}>
          {list.map((post, i) => {
            return (
              <Link
                href="/blog/[slug]"
                as={`/blog/${post.slug}`}
                key={`${post.title}-${i}`}
                className={cn(styles.post, {
                  [styles.active]: post.slug === slug
                })}
              >
                <div className={styles.title}>{post.title}</div>
                <div className={cn(styles.description, 'clamp-2')}>
                  {post.description}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  })
}

const Posts = ({ slug, meta: entries }) => {
  const [showMore, setShowMore] = useState(3)

  return (
    <div className={styles.container}>
      <P content={entries.slice(0, 3)} slug={slug} />
      {showMore > 0 && <P content={entries.slice(3, showMore)} slug={slug} />}
      {showMore < entries.length && (
        <button
          onClick={() => {
            setShowMore(showMore + 3)
          }}
          className={styles.button}
        >
          Show More
        </button>
      )}
    </div>
  )
}

export default Posts
