import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { createEmptyFormState, getEventConfig } from './lib/eventConfigs'
import type { EventType, FormState } from './types'
import Navbar from './components/Navbar'
import DynamicForm from './components/DynamicForm'
import InvitationPreview from './components/InvitationPreview'
import DownloadPdfButton from './components/DownloadPdfButton'
import Footer from './components/Footer'


export default function App() {
  const [eventType, setEventType] = useState<EventType>('birthday')
  const [formState, setFormState] = useState<FormState>(() =>
    createEmptyFormState('birthday'),
  )

  // Event değişince form state'i event'ın alanlarına göre sıfırlıyoruz.
  useEffect(() => {
    setFormState(createEmptyFormState(eventType))
  }, [eventType])

  const previewRef = useRef<HTMLDivElement | null>(null)
  const eventConfig = useMemo(() => getEventConfig(eventType), [eventType])

  return (
    <div className="appShell">
      <Navbar eventType={eventType} onChange={setEventType} />

      <main className="appMain">
        <section className="formPanel" aria-label="Etkinlik bilgileri formu">
          <div className="panelHeader">
            <h2 className="panelTitle">{eventConfig.navLabel}</h2>
            <p className="panelSubtitle">
              Bilgileri doldurdukça davetiye tasarımınız sağ tarafta anında
              güncellenir.
            </p>
          </div>

          <DynamicForm
            eventType={eventType}
            value={formState}
            onChange={setFormState}
          />
        </section>

        <section
          className="previewPanel"
          aria-label="Davetiye önizleme"
        >
          <InvitationPreview
            ref={previewRef}
            eventType={eventType}
            value={formState}
          />
          <DownloadPdfButton
            eventType={eventType}
            previewRef={previewRef}
          />
        </section>
      </main>
      <Footer />
    </div>
  )
}
