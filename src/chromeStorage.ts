import type { StateStorage } from 'zustand/middleware'

interface ChromeStorageArea {
  get(keys?: string | string[] | null): Promise<Record<string, unknown>>
  set(items: Record<string, unknown>): Promise<void>
  remove(keys: string | string[]): Promise<void>
}

function getChromeStorage(): ChromeStorageArea | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = (globalThis as any).chrome
    return c?.storage?.local ?? null
  } catch {
    return null
  }
}

export const chromeStorage: StateStorage = {
  getItem: async (name: string) => {
    const storage = getChromeStorage()
    if (!storage) return localStorage.getItem(name)
    const result = await storage.get(name)
    return (result[name] as string) ?? null
  },
  setItem: async (name: string, value: string) => {
    const storage = getChromeStorage()
    if (!storage) {
      localStorage.setItem(name, value)
      return
    }
    await storage.set({ [name]: value })
  },
  removeItem: async (name: string) => {
    const storage = getChromeStorage()
    if (!storage) {
      localStorage.removeItem(name)
      return
    }
    await storage.remove(name)
  },
}
