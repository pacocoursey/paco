import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import postMeta from '../../data/blog.json'
import styles from './header.module.css'
import {
  Moon,
  Sun,
  Design,
  Book,
  M6,
  Music,
  Document,
  Pencil,
  ArrowRight,
  Twitter,
  GitHub,
  Search,
  RSS,
  Words,
  Lightbulb
} from '../icons'
import Command from '../command'
import useTheme from '../../lib/theme'

const Logo = () => {
  return (
    <Link href="/">
      <a aria-label="Navigate Home" className={styles.home}>
        <svg height="30" width="30" viewBox="0 0 43 50" fill="var(--fg)">
          <path d="M9.41558 50C4.56115 50 2.23885 47.3933 1.14535 45.2065C0.012987 42.9417 0 40.6797 0 40.5844V9.41558C0 9.32045 0.012987 7.05823 1.14535 4.79351C2.23885 2.60671 4.56115 0 9.41558 0H25C25.1747 0 29.3275 0.0241342 33.5182 2.11937C37.4824 4.10152 42.2078 8.32814 42.2078 17.2078C42.2078 26.0874 37.4824 30.3141 33.5182 32.2961C29.3275 34.3914 25.1747 34.4156 25 34.4156H18.8312V40.5844C18.8312 40.6797 18.8182 42.9417 17.6858 45.2065C16.5923 47.3933 14.27 50 9.41558 50ZM3.24675 40.5844C3.24686 40.5936 3.27175 42.2568 4.09307 43.8403C5.10974 45.8004 6.85076 46.7532 9.41558 46.7532C12.0175 46.7532 13.7728 45.7724 14.7817 43.7545C15.5626 42.1929 15.5844 40.6001 15.5844 40.5844V34.4825C14.1437 34.5769 11.9361 34.8047 9.76115 35.3532C5.43853 36.4434 3.24675 38.2035 3.24675 40.5844ZM17.2078 31.1688H25C25.0326 31.1687 28.649 31.1319 32.1601 29.3448C36.6728 27.0478 38.961 22.9643 38.961 17.2078C38.961 11.4104 36.6412 7.31093 32.0662 5.02348C28.5535 3.2671 25.0351 3.24675 25 3.24675H9.41558C6.81364 3.24675 5.05833 4.2276 4.04946 6.24545C3.26861 7.80714 3.24675 9.39989 3.24675 9.41558V34.6601C4.59318 33.6926 6.45996 32.8318 9.02186 32.1913C13.0654 31.1804 17.0406 31.1688 17.2078 31.1688Z" />
        </svg>
      </a>
    </Link>
  )
}

const CommandIcon = () => {
  return (
    <svg height="30" viewBox="0 0 20 20" fill="var(--fg)">
      <path d="M6.023 7.296v5.419H3.648C1.644 12.715 0 14.316 0 16.342 0 18.355 1.644 20 3.648 20a3.657 3.657 0 003.648-3.659v-2.375h5.397v2.376A3.657 3.657 0 0016.343 20c2.004 0 3.647-1.644 3.647-3.659 0-2.025-1.643-3.626-3.648-3.626h-2.375v-5.42h2.376c2.004 0 3.647-1.611 3.647-3.626C19.99 1.644 18.346 0 16.341 0c-2.014 0-3.648 1.644-3.648 3.67v2.364H7.296V3.669C7.296 1.644 5.663 0 3.648 0 1.644 0 0 1.644 0 3.67c0 2.014 1.644 3.626 3.648 3.626h2.375zm-2.375-1.24c-1.294 0-2.375-1.083-2.375-2.387 0-1.315 1.081-2.396 2.375-2.396 1.304 0 2.375 1.081 2.375 2.396v2.386H3.648zm12.694 0h-2.376V3.668c0-1.315 1.071-2.396 2.376-2.396 1.293 0 2.375 1.081 2.375 2.396 0 1.304-1.082 2.386-2.375 2.386zm-9.046 6.67V7.274h5.397v5.45H7.296zm-3.648 1.219h2.375v2.386a2.387 2.387 0 01-2.375 2.386 2.394 2.394 0 01-2.375-2.386 2.394 2.394 0 012.375-2.386zm12.694 0a2.394 2.394 0 012.375 2.386 2.394 2.394 0 01-2.375 2.386 2.387 2.387 0 01-2.376-2.386v-2.386h2.376z" />
    </svg>
  )
}

const Header = ({ title, content }) => {
  console.log(postMeta)

  const router = useRouter()
  const [placeholder, setPlaceholder] = useState('Type a command or search...')
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <Command
          max={7}
          width="calc(var(--main-content) - var(--gap))"
          placeholder={placeholder}
          options={[
            {
              name: 'Toggle theme',
              keybind: 't',
              icon: theme === 'light' ? <Moon /> : <Sun />,
              callback: () => toggleTheme()
            },
            {
              name: 'Blog',
              collection: true,
              items: [
                {
                  name: 'Blog',
                  keybind: 'g b',
                  icon: <Pencil />,
                  callback: () => router.push('/blog')
                },
                {
                  name: 'Search blog...',
                  icon: <Search />,
                  callback: () => setPlaceholder('Search blog posts...'),
                  items: postMeta.map(post => {
                    return {
                      name: post.title,
                      callback: () =>
                        router.push('/blog/[slug]', `/blog/${post.slug}`)
                    }
                  })
                },
                {
                  name: 'RSS',
                  icon: <RSS />,
                  callback: () => router.push('/feed.xml')
                }
              ]
            },
            {
              name: 'Collections',
              collection: true,
              items: [
                {
                  name: 'Reading collection',
                  keybind: 'g r',
                  icon: <Book />,
                  callback: () => router.push('/reading')
                },
                {
                  name: 'Design collection',
                  keybind: 'g d',
                  icon: <Design />,
                  callback: () => router.push('/design')
                },
                {
                  name: 'Keyboard collection',
                  keybind: 'g k',
                  icon: <M6 />,
                  callback: () => router.push('/keyboards')
                },
                {
                  name: 'Music collection',
                  keybind: 'g m',
                  icon: <Music />,
                  callback: () => router.push('/music')
                },
                {
                  name: 'Projects collection',
                  keybind: 'g p',
                  icon: <Document />,
                  callback: () => router.push('/projects')
                }
              ]
            },
            {
              name: 'Navigation',
              collection: true,
              items: [
                {
                  name: 'Home',
                  keybind: 'g h',
                  icon: <ArrowRight />,
                  callback: () => router.push('/')
                },
                {
                  name: 'Contact',
                  keybind: 'g c',
                  icon: <ArrowRight />,
                  callback: () => router.push('/contact')
                },
                {
                  name: 'Words',
                  keybind: 'g w',
                  icon: <Words />,
                  callback: () => router.push('/words')
                },
                {
                  name: 'Ideas',
                  keybind: 'g i',
                  icon: <Lightbulb />,
                  callback: () => router.push('/blog/[slug]', '/blog/ideas')
                }
              ]
            },
            {
              name: 'Social',
              collection: true,
              items: [
                {
                  name: 'Twitter',
                  icon: <Twitter />,
                  callback: () =>
                    window.open(
                      'https://twitter.com/pacocoursey',
                      '_blank',
                      'noopener noreferrer'
                    )
                },
                {
                  name: 'GitHub',
                  icon: <GitHub />,
                  callback: () =>
                    window.open(
                      'https://github.com/pacocoursey',
                      '_blank',
                      'noopener noreferrer'
                    )
                }
              ]
            }
          ]}
        >
          <button className={styles.command} title="⌘K">
            <CommandIcon />
          </button>
        </Command>

        {content && <div className={styles.content}>{content}</div>}
      </div>
    </nav>
  )
}

export default Header
