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
  Logo as LogoIcon,
  Command as CommandIcon
} from '@components/icons'

const Header = ({ title }) => {
  const router = useRouter()
  const [hint, setHint] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [options, setOptions] = useState(null)
  const isMac = useRef()

  useEffect(() => {
    router.prefetch('/blog')
    router.prefetch('/reading')
    router.prefetch('/design')
    router.prefetch('/projects')
    router.prefetch('/quotes')
    router.prefetch('/words')
    router.prefetch('/contact')

    if (!localStorage.getItem('hide-hint')) {
      setHint(true)
    }

    isMac.current = window.navigator.platform.indexOf('Mac') > -1
  }, [router])

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
            name: 'Keyboards',
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

  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <Link href="/">
          <a aria-label="Navigate Home" className={styles.logo}>
            <LogoIcon />
          </a>
        </Link>

        <Command
          max={5}
          width="calc(var(--main-content) - var(--gap))"
          top={
            hint && (
              <div className={styles.hint}>
                <div>
                  Press{' '}
                  {isMac.current === true ? <kbd>⌘ K</kbd> : <kbd>⌃ K</kbd>} to
                  open this menu anywhere.
                </div>

                <Button
                  onClick={() => {
                    localStorage.setItem('hide-hint', '1')
                    setHint(false)
                  }}
                >
                  Got it
                </Button>
              </div>
            )
          }
          placeholder="Type a command or search..."
          items={options || defaultOptions}
          onClose={() => setOptions(null)}
        >
          <button className={styles.command} title="⌘K">
            <CommandIcon />
          </button>
        </Command>

        {title && <div className={styles.content}>{title}</div>}
      </div>
    </nav>
  )
}

export default Header
