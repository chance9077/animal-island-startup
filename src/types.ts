export interface SearchEngine {
  name: string
  url: string
  color: string
  enabled: boolean
}

export interface AppState {
  engines: SearchEngine[]
  activeEngineKey: string
  settingsOpen: boolean

  setActiveEngine: (name: string) => void
  reorderEngines: (from: number, to: number) => void
  toggleEngine: (name: string) => void
  toggleSettings: () => void
  addEngine: (engine: SearchEngine) => void
  removeEngine: (name: string) => void
}
