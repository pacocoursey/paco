import Link from 'next/link'

import styles from './header.module.css'
import LogoIcon from '@components/icons/logo'
import useTheme from '@lib/theme'
import Moon from '@components/icons/moon'
import Sun from '@components/icons/sun'
import useMounted from '@lib/use-mounted'

const Header = ({ title }) => {
  const isMounted = useMounted()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <Link href="/">
          <a aria-label="Navigate Home" className={styles.logo}>
            <LogoIcon />
          </a>
        </Link>

        {title && <div className={styles.content}>{title}</div>}

        <button
          className={styles.command}
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {isMounted &&
            (theme === 'light' ? (
              <Moon color="var(--fg)" size={30} key="icon-light" />
            ) : (
              <Sun color="var(--fg)" size={30} key="icon-dark" />
            ))}
        </button>
      </div>
    </nav>
  )
}

export default Header
