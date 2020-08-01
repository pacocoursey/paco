import React, { useCallback, useContext, useMemo, useState } from "react";
import {
  createNamedContext,
  noop,
  useIsomorphicLayoutEffect,
  usePrevious,
} from "@reach/utils";

export function createDescendantContext<DescendantType extends Descendant>(
  name: string,
  initialValue = {}
) {
  type T = DescendantContextValue<DescendantType>;
  const descendants: DescendantType[] = [];
  return createNamedContext<T>(name, {
    descendants,
    registerDescendant: noop,
    unregisterDescendant: noop,
    ...initialValue,
  });
}

/**
 * This hook registers our descendant by passing it into an array. We can then
 * search that array by to find its index when registering it in the component.
 * We use this for focus management, keyboard navigation, and typeahead
 * functionality for some components.
 *
 * The hook accepts the element node and (optionally) a key. The key is useful
 * if multiple descendants have identical text values and we need to
 * differentiate siblings for some reason.
 *
 * Our main goals with this are:
 *   1) maximum composability,
 *   2) minimal API friction
 *   3) SSR compatibility*
 *   4) concurrent safe
 *   5) index always up-to-date with the tree despite changes
 *   6) works with memoization of any component in the tree (hopefully)
 *
 * * As for SSR, the good news is that we don't actually need the index on the
 * server for most use-cases, as we are only using it to determine the order of
 * composed descendants for keyboard navigation. However, in the few cases where
 * this is not the case, we can require an explicit index from the app.
 */
export function useDescendant<DescendantType extends Descendant>(
  descendant: Omit<DescendantType, "index">,
  context: React.Context<DescendantContextValue<DescendantType>>,
  indexProp?: number
) {
  let [, forceUpdate] = useState();
  let { registerDescendant, unregisterDescendant, descendants } = useContext(
    context
  );

  // This will initially return -1 because we haven't registered the descendant
  // on the first render. After we register, this will then return the correct
  // index on the following render and we will re-register descendants
  // so that everything is up-to-date before the user interacts with a
  // collection.
  let index =
    indexProp ??
    descendants.findIndex((item) => item.element === descendant.element);

  let previousDescendants = usePrevious(descendants);

  // We also need to re-register descendants any time ANY of the other
  // descendants have changed. My brain was melting when I wrote this and it
  // feels a little off, but checking in render and using the result in the
  // effect's dependency array works well enough.
  let someDescendantsHaveChanged = descendants.some((descendant, index) => {
    return descendant.element !== previousDescendants?.[index]?.element;
  });

  // Prevent any flashing
  useIsomorphicLayoutEffect(() => {
    if (!descendant.element) forceUpdate({});
    registerDescendant({
      ...descendant,
      index,
    } as DescendantType);
    return () => unregisterDescendant(descendant.element);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    registerDescendant,
    unregisterDescendant,
    index,
    someDescendantsHaveChanged,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(descendant),
  ]);

  return index;
}

export function useDescendantsInit<DescendantType extends Descendant>() {
  return useState<DescendantType[]>([]);
}

export function useDescendants<DescendantType extends Descendant>(
  ctx: React.Context<DescendantContextValue<DescendantType>>
) {
  return useContext(ctx).descendants;
}

export function DescendantProvider<DescendantType extends Descendant>({
  context: Ctx,
  children,
  items,
  set,
}: {
  context: React.Context<DescendantContextValue<DescendantType>>;
  children: React.ReactNode;
  items: DescendantType[];
  set: React.Dispatch<React.SetStateAction<DescendantType[]>>;
}) {
  let registerDescendant = useCallback(
    ({
      element,
      index: explicitIndex,
      ...rest
    }: Omit<DescendantType, "index"> & { index?: number | undefined }) => {
      if (!element) {
        return;
      }

      set((items) => {
        let newItems: DescendantType[];
        if (explicitIndex != null) {
          newItems = [
            ...items,
            {
              ...rest,
              element,
              index: explicitIndex,
            } as DescendantType,
          ];
        } else if (items.length === 0) {
          // If there are no items, register at index 0 and bail.
          newItems = [
            ...items,
            {
              ...rest,
              element,
              index: 0,
            } as DescendantType,
          ];
        } else if (items.find((item) => item.element === element)) {
          // If the element is already registered, just use the same array
          newItems = items;
        } else {
          // When registering a descendant, we need to make sure we insert in
          // into the array in the same order that it appears in the DOM. So as
          // new descendants are added or maybe some are removed, we always know
          // that the array is up-to-date and correct.
          //
          // So here we look at our registered descendants and see if the new
          // element we are adding appears earlier than an existing descendant's
          // DOM node via `node.compareDocumentPosition`. If it does, we insert
          // the new element at this index. Because `registerDescendant` will be
          // called in an effect every time the descendants state value changes,
          // we should be sure that this index is accurate when descendent
          // elements come or go from our component.
          let index = items.findIndex((item) => {
            if (!item.element || !element) {
              return false;
            }
            // Does this element's DOM node appear before another item in the
            // array in our DOM tree? If so, return true to grab the index at
            // this point in the array so we know where to insert the new
            // element.
            return Boolean(
              item.element.compareDocumentPosition(element as Node) &
                Node.DOCUMENT_POSITION_PRECEDING
            );
          });

          let newItem = {
            ...rest,
            element,
            index,
          } as DescendantType;

          // If an index is not found we will push the element to the end.
          if (index === -1) {
            newItems = [...items, newItem];
          } else {
            newItems = [
              ...items.slice(0, index),
              newItem,
              ...items.slice(index),
            ];
          }
        }
        return newItems.map((item, index) => ({ ...item, index }));
      });
    },
    // set is a state setter initialized by the useDescendants hook.
    // We can safely ignore the lint warning here because it will not change
    // between renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  let unregisterDescendant = useCallback(
    (element: DescendantType["element"]) => {
      if (!element) {
        return;
      }

      set((items) => items.filter((item) => element !== item.element));
    },
    // set is a state setter initialized by the useDescendants hook.
    // We can safely ignore the lint warning here because it will not change
    // between renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Ctx.Provider
      value={useMemo(() => {
        return {
          descendants: items,
          registerDescendant,
          unregisterDescendant,
        };
      }, [items, registerDescendant, unregisterDescendant])}
    >
      {children}
    </Ctx.Provider>
  );
}


////////////////////////////////////////////////////////////////////////////////
// Types

type SomeElement<T> = T extends Element ? T : HTMLElement;

export type Descendant<ElementType = HTMLElement> = {
  element: SomeElement<ElementType> | null;
  index: number;
};

export interface DescendantContextValue<DescendantType extends Descendant> {
  descendants: DescendantType[];
  registerDescendant(descendant: DescendantType): void;
  unregisterDescendant(element: DescendantType["element"]): void;
}
