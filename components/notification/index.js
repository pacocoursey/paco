import styles from './notification.module.css'
import Link from '@components/link'

const Notification = ({ title, text, href = '', index, date }) => {
  return (
    <Link
      className={styles.notification}
      href={href}
      style={{
        '--index': index
      }}
    >
      <div className={styles.title}>{title}</div>
      <span className={styles.text}>
        {text.split('').map((letter, i) => {
          if (letter === ' ') {
            return <span> </span>
          }

          return (
            <span
              key={`letter-${i}`}
              className={styles.letter}
              style={{
                '--idx': i
              }}
            >
              {letter}
            </span>
          )
        })}
      </span>
      <span className={styles.date}>{date}</span>
    </Link>
  )
}

export default Notification
