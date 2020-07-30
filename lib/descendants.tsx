import React, {
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect
} from 'react'
import {
  createNamedContext,
  noop,
  useIsomorphicLayoutEffect,
  usePrevious
} from '@reach/utils'

export function createDescendantContext<DescendantType extends Descendant>(
  name: string,
  initialValue = {}
) {
  type T = DescendantContextValue<DescendantType>
  const descendants: DescendantType[] = []
  return createNamedContext<T>(name, {
    descendants,
    registerDescendant: noop,
    unregisterDescendant: noop,
    ...initialValue
  })
}

export function useDescendant<DescendantType extends Descendant>(
  descendant: Omit<DescendantType, 'index'>,
  context: React.Context<DescendantContextValue<DescendantType>>
) {
  let [, forceUpdate] = useState()
  let { registerDescendant, unregisterDescendant, descendants } = useContext(
    context
  )

  let index = -1
  let count = 0
  let someDescendantsHaveChanged = false

  let previousDescendants = usePrevious(descendants)

  for (const desc of descendants) {
    // End the loop early, index has been assigned and someDescendantsHaveChanged has resolved
    if (index !== -1 && someDescendantsHaveChanged !== false) {
      break
    }

    if (desc.element === descendant.element) {
      index = count
    } else if (desc.element !== previousDescendants?.[count]?.element) {
      someDescendantsHaveChanged = true
    }

    count++
  }

  console.log(descendants, descendant.element)

  // Prevent any flashing
  useEffect(() => {
    if (!descendant.element) {
      console.log('force update')
      forceUpdate({})
    }

    registerDescendant({
      ...descendant,
      index
    } as DescendantType)

    return () => {
      unregisterDescendant(descendant.element)
    }
  }, [
    registerDescendant,
    unregisterDescendant,
    index,
    someDescendantsHaveChanged,
    ...Object.values(descendant)
  ])

  return { index, unregisterDescendant }
}

export function useDescendantsInit<DescendantType extends Descendant>() {
  return useState<DescendantType[]>([])
}

export function useDescendants<DescendantType extends Descendant>(
  ctx: React.Context<DescendantContextValue<DescendantType>>
) {
  return useContext(ctx).descendants
}

export function DescendantProvider<DescendantType extends Descendant>({
  context: Ctx,
  children,
  items,
  set
}: {
  context: React.Context<DescendantContextValue<DescendantType>>
  children: React.ReactNode
  items: DescendantType[]
  set: React.Dispatch<React.SetStateAction<DescendantType[]>>
}) {
  let registerDescendant = useCallback(
    ({
      element,
      index: explicitIndex,
      ...rest
    }: Omit<DescendantType, 'index'> & { index?: number | undefined }) => {
      if (!element) {
        return
      }

      set(items => {
        let newItems: DescendantType[] = []
        let count = 0

        for (const item of items) {
          newItems.push({
            ...item,
            index: count
          })
          count++
        }

        newItems.push({
          ...rest,
          element,
          index: explicitIndex
        } as DescendantType)

        return newItems
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  let unregisterDescendant = useCallback(
    (element: DescendantType['element']) => {
      if (!element) {
        return
      }

      set(items => {
        if (items.length === 0) return items
        return items.filter(item => element !== item.element)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Ctx.Provider
      value={useMemo(() => {
        return {
          descendants: items,
          registerDescendant,
          unregisterDescendant
        }
      }, [items, registerDescendant, unregisterDescendant])}
    >
      {children}
    </Ctx.Provider>
  )
}

////////////////////////////////////////////////////////////////////////////////
// Types

type SomeElement<T> = T extends Element ? T : HTMLElement

export type Descendant<ElementType = HTMLElement> = {
  element: SomeElement<ElementType> | null
  index: number
}

export interface DescendantContextValue<DescendantType extends Descendant> {
  descendants: DescendantType[]
  registerDescendant(descendant: DescendantType): void
  unregisterDescendant(element: DescendantType['element']): void
}
