import React, { useEffect, useRef, useMemo, useCallback, useState } from 'react'
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
} from '@components/cmd'

import {
  Command as CommandIcon,
  Sun,
  Moon,
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
  ArrowLeft,
  ArrowRight,
  GitHub,
  Twitter
} from '@components/icons'
import styles from './command.module.css'
import headerStyles from '@components/header/header.module.css'
import Button from '@components/button'
import useTheme from '@lib/theme'
import tinykeys from '@lib/tinykeys'
import postMeta from '@data/blog.json'

const CommandData = React.createContext({})
const useCommandData = () => React.useContext(CommandData)

const HeaderMenu = () => {
  const listRef = useRef()
  const commandRef = useRef()
  const router = useRouter()
  const { toggleTheme } = useTheme()
  const commandProps = useCommand()
  const [pages, setPages] = usePages(commandProps, DefaultItems)
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

  const closeOnCallback = useCallback(cb => {
    cb()
    setOpen(false)
  }, [])

  const keymap = useMemo(() => {
    return {
      t: () => closeOnCallback(() => toggleTheme()),
      // Blog
      'g b': () => closeOnCallback(() => router.push('/blog')),
      // Navigation
      'g h': () => closeOnCallback(() => router.push('/')),
      'g c': () => router.push('/contact'),
      // Collections
      'g r': () => closeOnCallback(() => router.push('/reading')),
      'g d': () => closeOnCallback(() => router.push('/design')),
      'g k': () => closeOnCallback(() => router.push('/keyboards')),
      'g m': () => closeOnCallback(() => router.push('/music')),
      'g p': () => closeOnCallback(() => router.push('/projects')),
      'g q': () => closeOnCallback(() => router.push('/quotes')),
      'g w': () => closeOnCallback(() => router.push('/words')),
      'g i': () => closeOnCallback(() => router.push('/ideas')),
      // Social
      'g t': () =>
        closeOnCallback(() =>
          window.open('https://twitter.com/pacocoursey', '_blank')
        )
    }
  }, [toggleTheme, router, closeOnCallback])

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

  const bounce = useCallback(() => {
    if (commandRef.current) {
      // Bounce the UI slightly
      commandRef.current.style.transform = 'scale(0.99)'
      // Not exactly safe, but should be OK
      setTimeout(() => {
        commandRef.current.style.transform = ''
      }, 100)
    }
  }, [])

  useEffect(() => {
    // When items change, bounce the UI
    bounce()
  }, [pages, bounce])

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
          className={cn(styles.command, {
            [styles.show]: rendered
          })}
        >
          <Command {...commandProps} ref={commandRef}>
            <div className={styles.top}>
              <CommandInput placeholder="Type a command or search..." />
              {pages.length > 1 && (
                <Button onClick={() => setPages(pages.slice(0, -1))}>
                  <ArrowLeft size={18} />
                </Button>
              )}
            </div>

            <div
              className={cn(styles.container, {
                [styles.empty]: list.current.length === 0
              })}
              style={{
                height: listRef.current?.offsetHeight
                  ? Math.min(listRef.current.offsetHeight + 1, 300)
                  : undefined
              }}
            >
              <CommandList ref={listRef}>
                <CommandData.Provider value={keymap}>
                  <Items
                    state={{ pages, search, open }}
                    setPages={setPages}
                    keymap={keymap}
                  />
                </CommandData.Provider>
              </CommandList>
            </div>
          </Command>
        </DialogContent>
      </DialogOverlay>
    </>
  )
}

export default HeaderMenu

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

const DefaultItems = ({ setPages, state, keymap }) => {
  const { theme } = useTheme()
  const router = useRouter()

  return (
    <>
      <Item
        value="Toggle Theme"
        key="Toggle Theme"
        icon={theme === 'light' ? <Moon /> : <Sun />}
        keybind="t"
      />
      <Group title="Blog">
        <Item value="Blog" icon={<Pencil />} keybind="g b" />
        <Item
          value="Search blog..."
          icon={<Search />}
          callback={() => setPages([...state.pages, BlogItems])}
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
        <Item value="Twitter" icon={<Twitter />} keybind="g t" />
      </Group>
    </>
  )
}

const Item = ({ icon, children, callback, keybind, ...props }) => {
  const keymap = useCommandData()

  return (
    <CommandItem {...props} callback={callback || keymap[keybind]}>
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
