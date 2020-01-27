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

const Posts = ({ slug }) => {
  return (
    <div className={styles.container}>
      {Object.entries(posts).map(([month, list], j) => {
        return (
          <div key={`${month}-${list.length}-${j}`} className={styles.group}>
            <date className={styles.month}>{month}</date>

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
                    <div className={cn(styles.description, 'clamp-2')}>{post.description}</div>
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Posts
