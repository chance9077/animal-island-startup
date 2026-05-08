import { useEffect, useRef, useState } from 'react'
import { Input, Footer } from 'animal-island-ui'
import { useStore } from './store'
import SettingsIcon from './components/SettingsIcon'
import SettingsPanel from './components/SettingsPanel'
import './App.css'

function matchEngines(names: string[], input: string): string[] {
  const q = input.toLowerCase().trim()
  if (!q) return []
  return names.filter((n) => n.toLowerCase().startsWith(q))
}

function getInputElement(wrapper: HTMLDivElement | null): HTMLInputElement | null {
  return wrapper?.querySelector('input') ?? null
}

export default function App() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const [candidates, setCandidates] = useState<string[]>([])
  const [candidateIdx, setCandidateIdx] = useState(0)

  const engines = useStore((s) => s.engines)
  const activeEngineKey = useStore((s) => s.activeEngineKey)
  const setActiveEngine = useStore((s) => s.setActiveEngine)

  const enabledEngines = engines.filter((e) => e.enabled)
  const activeEngine = enabledEngines.find((e) => e.name === activeEngineKey) ?? enabledEngines[0]

  useEffect(() => {
    getInputElement(wrapperRef.current)?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault()
        getInputElement(wrapperRef.current)?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const buildSearchUrl = (engine: typeof activeEngine, q: string) =>
    engine.url.replace('{q}', encodeURIComponent(q))

  const handleSearch = () => {
    const q = query.trim()
    if (q) {
      window.location.href = buildSearchUrl(activeEngine, q)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const q = query.trim()
    const engineNames = enabledEngines.map((eng) => eng.name)

    if (e.key === 'Tab') {
      e.preventDefault()
      if (!q) return

      if (candidates.length > 0) {
        const next = (candidateIdx + 1) % candidates.length
        setCandidateIdx(next)
      } else {
        const matched = matchEngines(engineNames, q)
        if (matched.length > 0) {
          setCandidates(matched)
          setCandidateIdx(0)
        }
      }
    } else if (e.key === ' ') {
      if (candidates.length > 0) {
        e.preventDefault()
        setActiveEngine(candidates[candidateIdx])
        setQuery('')
        setCandidates([])
        setCandidateIdx(0)
      }
    } else if (e.key === 'Enter') {
      handleSearch()
    } else if (e.key === 'Escape') {
      setCandidates([])
      setCandidateIdx(0)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setCandidates([])
    setCandidateIdx(0)
  }

  const handleClear = () => {
    setQuery('')
    setCandidates([])
    setCandidateIdx(0)
  }

  return (
    <div className="app">
      <SettingsIcon />
      <SettingsPanel />

      <div className="searchWrapper" ref={wrapperRef}>
        <Input
          size="large"
          className="searchInput"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onClear={handleClear}
          placeholder="搜索…"
          allowClear
          prefix={
            <span
              className="engineBadge"
              style={{ '--badge-color': activeEngine.color } as React.CSSProperties}
            >
              {activeEngine.name}
            </span>
          }
        />

        {candidates.length > 0 && (
          <div className="candidateBar">
            {candidates.map((name, i) => {
              const eng = enabledEngines.find((e) => e.name === name)!
              return (
                <span
                  key={name}
                  className={`candidateTag ${i === candidateIdx ? 'candidateTagActive' : ''}`}
                  style={{ '--tag-color': eng.color } as React.CSSProperties}
                >
                  {name}
                </span>
              )
            })}
            <span className="candidateHint">Tab 切换 · Space 确认</span>
          </div>
        )}
      </div>

      <div className="footerSpacer" />
      <Footer type="tree" />
    </div>
  )
}
