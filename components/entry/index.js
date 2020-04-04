import cn from 'classnames'
import { useInView } from 'react-intersection-observer'
import 'intersection-observer'

import styles from './entry.module.css'
const imagePrefix = `https://res.cloudinary.com/dsdlhtnpw/image/fetch/q_60,w_1000`

const Entry = ({ title, description, image, href, position }) => {
  const [ref, inView] = useInView({ triggerOnce: true })

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      className={cn(styles.link, { [styles.active]: !image })}
      title={`${title} - ${description}`}
    >
      <section
        style={{
          backgroundImage: image
            ? !inView
              ? 'none'
              : `url('${imagePrefix}/${encodeURIComponent(image)}')`
            : 'none',
          backgroundPosition: position ? position : 'center'
        }}
      >
        <div>
          <p className={cn(styles.title, 'clamp')}>{title}</p>
          <p className={cn(styles.description, 'clamp')}>{description}</p>
        </div>
      </section>
    </a>
  )
}

export default Entry
