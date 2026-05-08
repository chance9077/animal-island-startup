import { useState } from 'react'
import { Tabs, Switch } from 'animal-island-ui'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useStore } from '../store'
import type { SearchEngine } from '../types'
import './Drawer.css'

function SortableEngineItem({
  engine,
  onDelete,
  onToggle,
  disableDelete,
}: {
  engine: SearchEngine
  onDelete: () => void
  onToggle: () => void
  disableDelete: boolean
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: engine.name })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      className={`engineItem ${isDragging ? 'engineItemDragging' : ''}`}
      ref={setNodeRef}
      style={style}
    >
      <span className="engineDotArea">
        <span
          className="engineColorDot"
          style={{ background: engine.color }}
        />
        <span
          className="engineDragHandle"
          {...attributes}
          {...listeners}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="9" cy="6" r="1.5" />
            <circle cx="15" cy="6" r="1.5" />
            <circle cx="9" cy="12" r="1.5" />
            <circle cx="15" cy="12" r="1.5" />
            <circle cx="9" cy="18" r="1.5" />
            <circle cx="15" cy="18" r="1.5" />
          </svg>
        </span>
      </span>
      <div className="engineInfo">
        <div className="engineName">{engine.name}</div>
      </div>
      <Switch
        size="small"
        checked={engine.enabled}
        onChange={onToggle}
      />
      <button
        className="engineDelete"
        disabled={disableDelete}
        onClick={onDelete}
        aria-label="删除"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>
    </div>
  )
}

function EngineTab() {
  const engines = useStore((s) => s.engines)
  const addEngine = useStore((s) => s.addEngine)
  const removeEngine = useStore((s) => s.removeEngine)
  const reorderEngines = useStore((s) => s.reorderEngines)
  const toggleEngine = useStore((s) => s.toggleEngine)

  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [color, setColor] = useState('#19c8b9')

  const isDuplicate = engines.some(
    (e) => e.name.toLowerCase() === name.trim().toLowerCase(),
  )
  const canSubmit = name.trim() !== '' && url.trim() !== '' && !isDuplicate

  const handleSubmit = () => {
    if (!canSubmit) return
    addEngine({ name: name.trim(), url: url.trim(), color, enabled: true })
    setName('')
    setUrl('')
    setColor('#19c8b9')
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const from = engines.findIndex((e) => e.name === active.id)
    const to = engines.findIndex((e) => e.name === over.id)
    if (from !== -1 && to !== -1) reorderEngines(from, to)
  }

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={engines.map((e) => e.name)}
          strategy={verticalListSortingStrategy}
        >
          <div className="engineList">
            {engines.map((eng) => (
              <SortableEngineItem
                key={eng.name}
                engine={eng}
                onDelete={() => removeEngine(eng.name)}
                onToggle={() => toggleEngine(eng.name)}
                disableDelete={engines.length <= 1}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="addEngineForm">
        <p className="addEngineTitle">添加自定义引擎</p>
        <div className="formRow">
          <input
            className="formInput"
            placeholder="名称（作为触发前缀）"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="color"
            className="formInputColor"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="formRow">
          <input
            className="formInput"
            placeholder="URL（用 {q} 表示搜索词）"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        {isDuplicate && name.trim() !== '' && (
          <p className="formDuplicateHint">名称已存在</p>
        )}
        <button
          className="formSubmit"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          添加
        </button>
      </div>
    </div>
  )
}

const tabItems = [
  { key: 'engines', label: '搜索引擎', children: <EngineTab /> },
]

export default function SettingsPanel() {
  const settingsOpen = useStore((s) => s.settingsOpen)
  const toggleSettings = useStore((s) => s.toggleSettings)

  if (!settingsOpen) return null

  return (
    <>
      <div className="drawerMask" onClick={toggleSettings} />
      <div className="drawer">
        <div className="drawerHeader">
          <h2 className="drawerTitle">设置</h2>
          <button className="drawerClose" onClick={toggleSettings}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="drawerBody">
          <Tabs items={tabItems} defaultActiveKey="engines" />
        </div>
      </div>
    </>
  )
}
