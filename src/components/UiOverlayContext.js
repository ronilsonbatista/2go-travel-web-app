"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

const UiOverlayContext = createContext({
  isBlocked: false,
  acquire: () => {},
  release: () => {}
});

/**
 * Counts open drawers/modals so the mobile FAB can hide instead of covering CTAs.
 */
export function UiOverlayProvider({ children }) {
  const [lockCount, setLockCount] = useState(0);

  const acquire = useCallback(() => {
    setLockCount((count) => count + 1);
  }, []);

  const release = useCallback(() => {
    setLockCount((count) => Math.max(0, count - 1));
  }, []);

  const value = useMemo(
    () => ({
      isBlocked: lockCount > 0,
      acquire,
      release
    }),
    [lockCount, acquire, release]
  );

  return (
    <UiOverlayContext.Provider value={value}>{children}</UiOverlayContext.Provider>
  );
}

/** Keep FAB hidden while `active` is true (drawer, dialog, etc.). */
export function useUiOverlayLock(active) {
  const { acquire, release } = useContext(UiOverlayContext);

  useEffect(() => {
    if (!active) return undefined;
    acquire();
    return () => release();
  }, [active, acquire, release]);
}

export function useUiOverlayBlocked() {
  return useContext(UiOverlayContext).isBlocked;
}
