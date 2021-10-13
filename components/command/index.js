import React, { useEffect, useRef, useMemo, useState, memo } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import useDelayedRender from 'use-delayed-render'
import { DialogContent, DialogOverlay } from '@reach/dialog'

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  useCommand,
  usePages,
  CommandGroup
} from 'cmdk'

import {
  Command as CommandIcon,
  Sparkles,
  Pencil,
  Search,
  RSS,
  Design,
  M6,
  Book,
  Music,
  Document,
  Quote,
  Words,
  Lightbulb,
  ArrowRight,
  GitHub,
  Twitter
} from '@components/icons'
import styles from './command.module.css'
import headerStyles from '@components/header/header.module.css'
import { useTheme } from 'next-themes'
import tinykeys from '@lib/tinykeys'
import postMeta from '@data/blog.json'

const CommandData = React.createContext({})
const useCommandData = () => React.useContext(CommandData)

const CommandMenu = memo(() => {
  const listRef = useRef()
  const commandRef = useRef()
  const router = useRouter()
  const commandProps = useCommand({
    label: 'Site Navigation'
  })
  const [pages, setPages] = usePages(commandProps, ThemeItems)
  const [open, setOpen] = useState(false)
  const { search, list } = commandProps

  const { mounted, rendered } = useDelayedRender(open, {
    enterDelay: -1,
    exitDelay: 200
  })

  // Can't do this inside of useCommand because it relies on useDelayedRender
  useEffect(() => {
    if (!mounted) {
      setPages([DefaultItems])
    }
  }, [mounted, setPages])

  const Items = pages[pages.length - 1]

  const keymap = useMemo(() => {
    return {
      t: () => {
        setPages([ThemeItems])
        setOpen(true)
      },
      // Blog
      'g b': () => router.push('/blog'),
      // Navigation
      'g h': () => router.push('/'),
      'g c': () => router.push('/contact'),
      // Collections
      'g r': () => router.push('/reading'),
      'g d': () => router.push('/design'),
      'g k': () => router.push('/keyboards'),
      'g m': () => router.push('/music'),
      'g p': () => router.push('/projects'),
      'g q': () => router.push('/quotes'),
      'g w': () => router.push('/words'),
      'g i': () => router.push('/ideas'),
      // Social
      'g t': () => () =>
        window.open('https://twitter.com/pacocoursey', '_blank')
    }
  }, [router, setPages])

  // Register the keybinds globally
  useEffect(() => {
    const unsubs = [
      tinykeys(window, keymap, { ignoreFocus: true }),
      tinykeys(window, { '$mod+k': () => setOpen(o => !o) })
    ]
    return () => {
      unsubs.forEach(unsub => unsub())
    }
  }, [keymap])

  useEffect(() => {
    // When items change, bounce the UI
    if (commandRef.current) {
      // Bounce the UI slightly
      commandRef.current.style.transform = 'scale(0.99)'
      commandRef.current.style.transition = 'transform 0.1s ease'
      // Not exactly safe, but should be OK
      setTimeout(() => {
        commandRef.current.style.transform = ''
      }, 100)
    }
  }, [pages])

  const heightRef = useRef()

  useEffect(() => {
    if (!listRef.current || !heightRef.current) return

    const height = Math.min(listRef.current.offsetHeight + 1, 300)
    heightRef.current.style.height = height + 'px'
  })

  return (
    <>
      <button
        className={headerStyles.command}
        title="⌘K"
        onClick={() => setOpen(true)}
      >
        <CommandIcon />
      </button>

      <DialogOverlay
        isOpen={mounted}
        className={cn(styles.screen, {
          [styles.show]: rendered
        })}
        onDismiss={() => setOpen(false)}
      >
        <DialogContent
          className={styles['dialog-content']}
          aria-label="Site Navigation"
        >
          <Command
            {...commandProps}
            ref={commandRef}
            className={cn(styles.command, {
              [styles.show]: rendered
            })}
          >
            <div className={styles.top}>
              <CommandInput
                placeholder={
                  Items === ThemeItems
                    ? 'Select a theme...'
                    : Items === BlogItems
                    ? 'Search for posts...'
                    : 'Type a command or search...'
                }
              />
            </div>

            <div
              ref={heightRef}
              className={cn(styles.container, {
                [styles.empty]: list.current.length === 0
              })}
            >
              <CommandList ref={listRef}>
                <CommandData.Provider
                  value={{ pages, search, open, setPages, keymap, setOpen }}
                >
                  <Items />
                </CommandData.Provider>
              </CommandList>
            </div>
          </Command>
        </DialogContent>
      </DialogOverlay>
    </>
  )
})

CommandMenu.displayName = 'CommandMenu'
export default CommandMenu

const ThemeItems = () => {
  const { theme: activeTheme, themes, setTheme } = useTheme()
  const { setOpen } = useCommandData()

  return themes.map(theme => {
    if (theme === activeTheme) return null
    return (
      <Item
        value={theme}
        key={`theme-${theme}`}
        callback={() => {
          setTheme(theme)
          setOpen(false)
        }}
      >
        {theme}
      </Item>
    )
  })
}

const BlogItems = () => {
  const router = useRouter()

  return postMeta.map((post, i) => {
    return (
      <Item
        key={`blog-item-${post.title}-${i}`}
        value={post.title}
        callback={() => router.push('/blog/[slug]', `/blog/${post.slug}`)}
      />
    )
  })
}

const Label = ({ title, values, search }) => {
  return (
    <div className={styles.label} aria-hidden>
      {title}
    </div>
  )
}

const Group = ({ children, title }) => {
  return (
    <CommandGroup heading={<Label title={title} />} className={styles.group}>
      {children}
    </CommandGroup>
  )
}

const DefaultItems = () => {
  const router = useRouter()
  const { setPages, pages } = useCommandData()

  return (
    <>
      <Item
        value="Themes"
        icon={<Sparkles />}
        keybind="t"
        closeOnCallback={false}
      />
      <Group title="Blog">
        <Item value="Blog" icon={<Pencil />} keybind="g b" />
        <Item
          value="Search blog..."
          icon={<Search />}
          closeOnCallback={false}
          callback={() => setPages([...pages, BlogItems])}
        />
        <Item
          value="RSS"
          icon={<RSS />}
          callback={() => router.push('/feed.xml')}
        />
      </Group>

      <Group title="Collection">
        <Item value="Reading" icon={<Book />} keybind="g r" />
        <Item value="Design" icon={<Design />} keybind="g d" />
        <Item value="Keyboards" icon={<M6 />} keybind="g k" />
        <Item value="Music" icon={<Music />} keybind="g m" />
        <Item value="Projects" icon={<Document />} keybind="g p" />
        <Item value="Quotes" icon={<Quote />} keybind="g q" />
        <Item value="Words" icon={<Words />} keybind="g w" />
        <Item value="Ideas" icon={<Lightbulb />} keybind="g i" />
      </Group>

      <Group title="Navigation">
        <Item value="Home" icon={<ArrowRight />} keybind="g h" />
        <Item value="Contact" icon={<ArrowRight />} keybind="g c" />
      </Group>

      <Group title="Social">
        <Item
          value="GitHub"
          icon={<GitHub />}
          callback={() =>
            window.open('https://github.com/pacocoursey', '_blank')
          }
        />
        <Item
          value="Twitter"
          icon={<Twitter />}
          keybind="g t"
          callback={() =>
            window.open('https://twitter.com/pacocoursey', '_blank')
          }
        />
      </Group>
    </>
  )
}

const Item = ({
  icon,
  children,
  callback,
  closeOnCallback = true,
  keybind,
  ...props
}) => {
  const { keymap, setOpen } = useCommandData()

  const cb = () => {
    if (callback) {
      callback()
    } else {
      keymap[keybind]?.()
    }

    if (closeOnCallback) {
      setOpen(false)
    }
  }

  return (
    <CommandItem {...props} callback={cb}>
      <div>
        <div className={styles.icon}>{icon}</div>
        {children || props.value}
      </div>

      {keybind && (
        <span className={styles.keybind}>
          {keybind.includes(' ') ? (
            keybind.split(' ').map((key, i) => {
              return <kbd key={`keybind-${key}-${i}`}>{key}</kbd>
            })
          ) : (
            <kbd>{keybind}</kbd>
          )}
        </span>
      )}
    </CommandItem>
  )
}
