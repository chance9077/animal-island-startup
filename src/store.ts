import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState } from './types'
import { builtinEngines } from './engines'
import { chromeStorage } from './chromeStorage'

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      engines: builtinEngines,
      activeEngineKey: builtinEngines[0].name,
      settingsOpen: false,

      setActiveEngine: (name) => set({ activeEngineKey: name }),
      reorderEngines: (from, to) =>
        set((s) => {
          const list = [...s.engines]
          const [moved] = list.splice(from, 1)
          list.splice(to, 0, moved)
          return { engines: list }
        }),
      toggleEngine: (name) =>
        set((s) => {
          const engines = s.engines.map((e) =>
            e.name === name ? { ...e, enabled: !e.enabled } : e,
          )
          const enabledCount = engines.filter((e) => e.enabled).length
          if (enabledCount === 0) return s
          return {
            engines,
            activeEngineKey: s.activeEngineKey === name && !engines.find((e) => e.name === name)!.enabled
              ? engines.find((e) => e.enabled)!.name
              : s.activeEngineKey,
          }
        }),
      toggleSettings: () => set((s) => ({ settingsOpen: !s.settingsOpen })),
      addEngine: (engine) =>
        set((s) => ({
          engines: [...s.engines, engine],
        })),
      removeEngine: (name) =>
        set((s) => {
          if (s.engines.length <= 1) return s
          const filtered = s.engines.filter((e) => e.name !== name)
          return {
            engines: filtered,
            activeEngineKey:
              s.activeEngineKey === name ? filtered[0].name : s.activeEngineKey,
          }
        }),
    }),
    {
      name: 'startup-page-config',
      storage: {
        getItem: async (name) => {
          const str = await chromeStorage.getItem(name)
          return str ? JSON.parse(str) : null
        },
        setItem: async (name, value) => {
          await chromeStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: async (name) => {
          await chromeStorage.removeItem(name)
        },
      },
      partialize: (state: AppState) => ({
        engines: state.engines,
      }) as AppState,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.activeEngineKey = state.engines.find((e) => e.enabled)?.name ?? state.engines[0].name
        }
      },
    },
  ),
)
