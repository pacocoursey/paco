import React, { memo, useCallback, useEffect, useRef } from 'react'
import matchSorter from 'match-sorter'
import cn from 'classnames'
import { useRouter } from 'next/router'
import useDelayedRender from 'use-delayed-render'

import {
  Filter,
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  useFilter
} from '@components/cmd'
import {
  useCommand,
  useResetSelected,
  useResetSearch
} from '@components/cmd/use-command'

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
  ArrowRight,
  GitHub,
  Twitter
} from '@components/icons'
import styles from './xx.module.css'
import headerStyles from '@components/header/header.module.css'
import Button from '@components/button'
import useTheme from '@lib/theme'

const HeaderMenu = () => {
  const {
    open,
    actions,
    inputRef,
    search,
    items,
    listProps,
    commandProps,
    descendants
  } = useCommand(
    {
      items: [DefaultItems]
    },
    useResetSelected,
    useResetSearch
  )

  const { mounted, rendered } = useDelayedRender(open, {
    enterDelay: -1,
    exitDelay: 200
  })

  // Can't do this inside of useCommand because it relies on useDelayedRender
  useEffect(() => {
    if (!mounted) {
      actions.setItems([DefaultItems])
    }
  }, [mounted, actions])

  const Items = items[items.length - 1]

  const listRef = useRef()

  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'k' && e.metaKey) {
        actions.toggle()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [actions])

  return (
    <>
      <button
        className={headerStyles.command}
        title="⌘K"
        onClick={actions.open}
      >
        <CommandIcon />
      </button>

      <Command
        {...commandProps}
        open={mounted}
        aria-label="Navigation Menu"
        className={cn(styles.command, {
          [styles.show]: rendered
        })}
        overlayClassName={cn(styles.screen, {
          [styles.show]: rendered
        })}
      >
        <div className={styles.top}>
          <CommandInput
            ref={inputRef}
            value={search}
            onChange={actions.setSearch}
            placeholder="Type a command or search..."
          />
          {items.length > 1 && (
            <Button onClick={() => actions.setItems(items.slice(0, -1))}>
              ←
            </Button>
          )}
        </div>

        <div
          className={cn(styles.container, {
            [styles.empty]: descendants.length === 0
          })}
          style={{
            height: listRef.current?.offsetHeight
              ? listRef.current.offsetHeight + 1
              : undefined
          }}
        >
          <CommandList {...listProps} ref={listRef}>
            <Items state={{ items, search, open }} actions={actions} />
          </CommandList>
        </div>
      </Command>
    </>
  )
}

export default HeaderMenu

/*















*/

const textFilter = ({ value }, search) => {
  return !!matchSorter([value], search).length
}

const BlogItems = () => (
  <>
    <CommandItem value="Post A" key="Post A">
      Post A
    </CommandItem>
    <CommandItem value="Post B" key="Post B">
      Post B
    </CommandItem>
  </>
)

const Label = ({ children, values, search }) => {
  const filter = useFilter()

  const shouldRender =
    typeof filter === 'function' ? filter(values, search) : true

  if (shouldRender) {
    return <li className={styles.label}>{children}</li>
  }

  return null
}

const labelFilter = (values, search) => {
  return !!matchSorter(values, search).length
}

const BlogGroup = ({ state, actions }) => {
  const router = useRouter()
  const values = ['Blog', 'Search blog...']

  return (
    <>
      <Filter filter={labelFilter}>
        <Label values={values} search={state.search}>
          Blog
        </Label>
      </Filter>
      <Item
        value="Blog"
        icon={<Pencil />}
        callback={() => router.push('/blog')}
      />
      <Item
        value="Search blog..."
        icon={<Search />}
        callback={() => actions.setItems([...state.items, BlogItems])}
      />
      <Item
        value="RSS"
        icon={<RSS />}
        callback={() => router.push('/feed.xml')}
      />
    </>
  )
}

const CollectionGroup = ({ state }) => {
  const values = ['Reading']
  const router = useRouter()

  return (
    <>
      <Filter filter={labelFilter}>
        <Label values={values} search={state.search}>
          Collections
        </Label>
      </Filter>
      <Item
        value="Reading"
        icon={<Book />}
        callback={() => router.push('/reading')}
      />
      <Item
        value="Design"
        icon={<Design />}
        callback={() => router.push('/design')}
      />
      <Item
        value="Keyboards"
        icon={<M6 />}
        callback={() => router.push('/keyboards')}
      />
      <Item
        value="Music"
        icon={<Music />}
        callback={() => router.push('/music')}
      />
      <Item
        value="Projects"
        icon={<Document />}
        callback={() => router.push('/projects')}
      />
      <Item
        value="Quotes"
        icon={<Quote />}
        callback={() => router.push('/quotes')}
      />
      <Item
        value="Words"
        icon={<Words />}
        callback={() => router.push('/words')}
      />
      <Item
        value="Ideas"
        icon={<Lightbulb />}
        callback={() => router.push('/ideas')}
      />
    </>
  )
}

const NavigationGroup = ({ state }) => {
  const router = useRouter()
  const values = ['Home', 'Contact']

  return (
    <>
      <Filter filter={labelFilter}>
        <Label values={values} search={state.search}>
          Navigation
        </Label>
      </Filter>
      <Item
        value="Home"
        icon={<ArrowRight />}
        callback={() => router.push('/')}
      />
      <Item
        value="Contact"
        icon={<ArrowRight />}
        callback={() => router.push('/contact')}
      />
    </>
  )
}

const SocialGroup = ({ state }) => {
  const values = ['GitHub', 'Twitter']

  return (
    <>
      <Filter filter={labelFilter}>
        <Label values={values} search={state.search}>
          Social
        </Label>
      </Filter>
      <Item
        value="GitHub"
        icon={<GitHub />}
        callback={() => window.open('https://github.com/pacocoursey', '_blank')}
      />
      <Item
        value="Twitter"
        icon={<Twitter />}
        callback={() =>
          window.open('https://twitter.com/pacocoursey', '_blank')
        }
      />
    </>
  )
}

const DefaultItems = props => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Filter filter={textFilter}>
      <Item
        value="Toggle Theme"
        key="Toggle Theme"
        icon={theme === 'light' ? <Moon /> : <Sun />}
        callback={() => toggleTheme()}
        keybind="t"
      />
      <BlogGroup {...props} />
      <CollectionGroup {...props} />
      <NavigationGroup {...props} />
      <SocialGroup {...props} />
    </Filter>
  )
}

const Item = memo(({ icon, children, keybind, ...props }) => {
  return (
    <CommandItem {...props}>
      <div className={styles.icon}>{icon}</div>
      {children || props.value}
      <div className={styles.keybind}>{keybind}</div>
    </CommandItem>
  )
})
