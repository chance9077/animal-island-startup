import { Icon } from 'animal-island-ui'
import { useStore } from '../store'
import './Drawer.css'

export default function SettingsIcon() {
  const toggleSettings = useStore((s) => s.toggleSettings)

  return (
    <button className="settingsIcon" onClick={toggleSettings} aria-label="设置">
      <Icon name="icon-diy" size={20} />
    </button>
  )
}
