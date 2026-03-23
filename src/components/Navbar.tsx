import type { EventType } from '../types'
import { getEventConfig } from '../lib/eventConfigs'

type Props = {
  eventType: EventType
  onChange: (next: EventType) => void
}

const EVENTS: EventType[] = ['birthday', 'wedding', 'party', 'graduation']

export default function Navbar({ eventType, onChange }: Props) {
  return (
    <nav className="topNav" aria-label="Etkinlik türü seçimi">
      
      {/* Logo */}
      <div className="logo">
        InviteGen
      </div>

      {/* Menü */}
      <div className="navMenu">
        {EVENTS.map((t) => {
          const cfg = getEventConfig(t)
          const isActive = t === eventType

          return (
            <button
              key={t}
              type="button"
              className={`navButton ${isActive ? 'navButton--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onChange(t)}
            >
              {cfg.navLabel}
            </button>
          )
        })}
      </div>

    </nav>
  )
}