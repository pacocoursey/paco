import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './header.module.css'
import postMeta from '@data/blog.json'
import Command from '@components/command'
import Button from '@components/button'
import useTheme from '@lib/theme'
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
  Lightbulb,
  Quote,
  Logo as LogoIcon
  // Command as CommandIcon
} from '@components/icons'
import CommandItem from '@components/command/item'
import CommandGroup from '@components/command/group'
import CommandDivider from '@components/command/divider'

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
  const [hint, setHint] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const isMac = useRef()

  useEffect(() => {
    if (!localStorage.getItem('hide-hint')) {
      setHint(true)
    }

    isMac.current = window.navigator.platform.indexOf('Mac') > -1
  }, [])

  const defaultOptions = useMemo(
    () => [
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
            callback: () => {
              const items = postMeta.map(post => {
                return {
                  name: post.title,
                  callback: () =>
                    router.push('/blog/[slug]', `/blog/${post.slug}`)
                }
              })

              setOptions(items)
            },
            onCallback: {
              clear: true,
              close: false,
              bounce: true
            }
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
            name: 'Reading',
            keybind: 'g r',
            icon: <Book />,
            callback: () => router.push('/reading')
          },
          {
            name: 'Design',
            keybind: 'g d',
            icon: <Design />,
            callback: () => router.push('/design')
          },
          {
            name: 'Keyboard',
            keybind: 'g k',
            icon: <M6 />,
            callback: () => router.push('/keyboards')
          },
          {
            name: 'Music',
            keybind: 'g m',
            icon: <Music />,
            callback: () => router.push('/music')
          },
          {
            name: 'Projects',
            keybind: 'g p',
            icon: <Document />,
            callback: () => router.push('/projects')
          },
          {
            name: 'Quotes',
            keybind: 'g q',
            icon: <Quote />,
            callback: () => router.push('/quotes')
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
            callback: () => router.push('/ideas')
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
            keybind: 'g t',
            callback: () =>
              window.open('https://twitter.com/pacocoursey', '_blank')
          },
          {
            name: 'GitHub',
            icon: <GitHub />,
            keybind: 'g g',
            callback: () =>
              window.open('https://github.com/pacocoursey', '_blank')
          }
        ]
      }
    ],
    [theme, router, toggleTheme]
  )

  const [checked, setChecked] = useState(false)

  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Logo />
        </div>
        hihihi

        {content && <div className={styles.content}>{content}</div>}
      </div>
    </nav>
  )
}

export default Header
