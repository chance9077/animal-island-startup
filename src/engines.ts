import type { SearchEngine } from './types'

export const builtinEngines: SearchEngine[] = [
  { name: 'Google', url: 'https://www.google.com/search?q={q}', color: '#4285f4', enabled: true },
  { name: 'npmx', url: 'https://npmx.dev/search?q={q}', color: '#cb3837', enabled: true },
  { name: 'GitHub', url: 'https://github.com/search?q={q}&type=repositories', color: '#333', enabled: true },
  { name: 'skills', url: 'https://skills.sh/?q={q}', color: '#6366f1', enabled: true },
]
