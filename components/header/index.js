import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './header.module.css'
import postMeta from '@data/blog.json'
import Command from '@components/command'
import useTheme from '@lib/theme'
import {
  Moon,
  Sun,
  Pencil,
  Search,
  RSS,
  Logo as LogoIcon,
  Command as CommandIcon
} from '@components/icons'

const Logo = () => {
  return (
    <Link href="/">
      <a aria-label="Navigate Home" className={styles.home}>
        <LogoIcon />
      </a>
    </Link>
  )
}

const Header = ({ title, content }) => {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [options, setOptions] = useState(null)
  const [checked, setChecked] = useState(false)

  const defaultOptions = useMemo(
    () => [
      {
        name: 'Toggle theme',
        keybind: 't',
        icon: theme === 'light' ? <Moon /> : <Sun />,
        callback: () => toggleTheme()
      },
      {
        name: 'Checkbox',
        icon: checked ? 'c' : 'n',
        onCallback: {
          close: false
        },
        callback: () => setChecked(c => !c)
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
            onCallback: {
              close: false,
              clear: true,
              bounce: true
            },
            callback: () => {
              const i = postMeta.map(post => {
                return {
                  name: post.title,
                  callback: () =>
                    router.push('/blog/[slug]', `/blog/${post.slug}`)
                }
              })
              i.push({
                name: 'Checkbox',
                closeOnCallback: false,
                icon: checked ? 'c' : 'n',
                callback: () => {
                  console.log('set checked!!')
                  setChecked(c => !c)
                }
              })
              setOptions(i)
            }
          },
          {
            name: 'RSS',
            icon: <RSS />,
            callback: () => router.push('/feed.xml')
          }
        ]
      }
    ],
    [theme, router, toggleTheme, checked]
  )

  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <Command
          open
          max={5}
          width="calc(var(--main-content) - var(--gap))"
          placeholder="Type a command or search..."
          onClose={() => setOptions(null)}
          items={options || defaultOptions}
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
