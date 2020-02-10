import { useState } from 'react'
import cn from 'classnames'

import Link from '../link'
import styles from './posts-list.module.css'
import raw from '../../data/blog.json'

const { data } = raw
const posts = {}
data
  .filter(p => p.hidden !== true)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map(p => {
    const d = new Date(p.date)
    const displayDate = `${d.toLocaleString('default', {
      year: 'numeric',
      month: 'long'
    })}`

    if (!posts[displayDate]) {
      posts[displayDate] = [p]
    } else {
      posts[displayDate].push(p)
    }
  })
const entries = Object.entries(posts)
const len = entries.length

const P = ({ content, slug }) => {
  return content.map(([month, list], j) => {
    return (
      <div key={`${month}-${list.length}-${j}`} className={styles.group}>
        <span className={styles.month}>
          {month}
        </span>

        <div className={styles.posts}>
          {list.map((post, i) => {
            return (
              <Link
                href="/[post]"
                as={`/${post.slug}`}
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

const Posts = ({ slug }) => {
  const [showMore, setShowMore] = useState(3)

  return (
    <div className={styles.container}>
      <P content={entries.slice(0, 3)} slug={slug} />
      {showMore > 0 && <P content={entries.slice(3, showMore)} slug={slug} />}
      {showMore < len && (
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
