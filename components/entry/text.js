import { memo } from 'react'
import cn from 'classnames'

import styles from './text.module.css'

const TextEntry = ({ title, description, type, comment, href }) => {
  return (
    <li className={styles.item}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={`${title} (${description})`}
        className={styles.link}
      >
        <div className={styles.type}>{type}</div>
        <div>
          <p className={cn(styles.title, 'clamp')}>{title}</p>
          {description && (
            <p className={cn(styles.description, 'clamp')}>{description}</p>
          )}
        </div>
      </a>
    </li>
  )
}

export default memo(TextEntry)
