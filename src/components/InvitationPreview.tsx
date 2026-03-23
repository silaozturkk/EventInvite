import { forwardRef } from 'react'
import type { EventType, FormState } from '../types'
import { getEventConfig } from '../lib/eventConfigs'
import { FaBirthdayCake, FaGraduationCap, FaHeart } from 'react-icons/fa'
import { GiPartyPopper } from 'react-icons/gi'

type Props = {
  eventType: EventType
  value: FormState
}

const InvitationPreview = forwardRef<HTMLDivElement, Props>(function InvitationPreview(
  { eventType, value }: Props,
  ref,
) {
  const cfg = getEventConfig(eventType)

  const messageRaw = cfg.preview.message(value).trim()
  const message = messageRaw.length ? messageRaw : cfg.preview.emptyMessage

  return (
    <div ref={ref} className={`invitation ${cfg.themeClass}`}>
      <div className="invitationInner">
        <div className="invitationHeader">
          <div className="invitationHeading">{cfg.preview.heading(value)}</div>
          <div className="invitationTitle">{cfg.preview.title(value)}</div>
        </div>

        <div className="invitationDecor" aria-hidden="true">
          {eventType === 'birthday' ? (
            <span className="invitationEventIcon invitationEventIcon--birthday">
              <FaBirthdayCake />
            </span>
          ) : null}

          {eventType === 'wedding' ? (
            <span className="invitationEventIcon invitationEventIcon--wedding">
              <FaHeart />
            </span>
          ) : null}

          {eventType === 'party' ? (
            <span className="invitationEventIcon invitationEventIcon--party">
              <GiPartyPopper />
            </span>
          ) : null}

          {eventType === 'graduation' ? (
            <span className="invitationEventIcon invitationEventIcon--graduation">
              <FaGraduationCap />
            </span>
          ) : null}
        </div>

        <div className="invitationMeta" aria-label="Etkinlik detayları">
          {cfg.preview.lines.map((line) => (
            <div key={line.label} className="invitationLine">
              <span className="invitationLineLabel">{line.label}</span>
              <span className="invitationLineValue">{line.getValue(value)}</span>
            </div>
          ))}
        </div>

        <div className="invitationMessage" aria-label="Davet mesajı">
          <div className="invitationMessageLabel">Mesaj</div>
          <p className="invitationMessageText">{message}</p>
        </div>
      </div>
    </div>
  )
})

export default InvitationPreview

