import { useState, useEffect, useRef } from 'react'
import type { EventType } from '../types'
import { getEventConfig } from '../lib/eventConfigs'

type Props = {
  eventType: EventType
  onChange: (next: EventType) => void
}

const EVENTS: EventType[] = ['birthday', 'wedding', 'party', 'graduation']

export default function Navbar({ eventType, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 700 && open) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    const onDocClick = (e: MouseEvent) => {
      if (!open) return
      const target = e.target as Node | null
      if (navRef.current && target && !navRef.current.contains(target)) {
        setOpen(false)
      }
    }

    window.addEventListener('resize', onResize)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDocClick)
    return () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDocClick)
    }
  }, [open])

  return (
    <nav ref={navRef} className="topNav" aria-label="Etkinlik türü seçimi">
      
      {/* Logo */}
      <div className="logo">
        InviteGen
      </div>

      {/* Hamburger (mobile) */}
      <button
        className={`hamburgerButton ${open ? 'is-open' : ''}`}
        aria-label="Menü"
        aria-expanded={open}
        aria-controls="nav-menu"
        onClick={() => setOpen((s) => !s)}
      >
        <span className="hamburgerBox" aria-hidden="true">
          <span className="hamburgerInner" />
        </span>
      </button>

      {/* Backdrop that dims background on mobile when menu is open */}
      <div
        className={`navBackdrop ${open ? 'navBackdrop--open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Menü */}
      <div id="nav-menu" className={`navMenu ${open ? 'navMenu--open' : ''}`}>
        {EVENTS.map((t) => {
          const cfg = getEventConfig(t)
          const isActive = t === eventType

          return (
            <button
              key={t}
              type="button"
              className={`navButton ${isActive ? 'navButton--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => { onChange(t); setOpen(false) }}
            >
              {cfg.navLabel}
            </button>
          )
        })}
      </div>

    </nav>
  )
}