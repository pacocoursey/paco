import { memo } from 'react'
import cn from 'classnames'

import styles from './text.module.css'

const TextEntry = ({ title, description, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={`${title} (${description})`}
      className={styles.link}
    >
      <div>
        <p className={cn(styles.title, 'clamp')}>{title}</p>
        {description && (
          <p className={cn(styles.description, 'clamp')}>{description}</p>
        )}
      </div>
    </a>
  )
}

export default memo(TextEntry)
