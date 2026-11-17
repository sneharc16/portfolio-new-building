import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** False during SSR and hydration, true afterwards: lets portals mount without a hydration mismatch. */
export function useIsClient() {
  return useSyncExternalStore(noop, () => true, () => false);
}
