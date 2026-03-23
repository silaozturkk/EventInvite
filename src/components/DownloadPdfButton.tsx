import { useState, type RefObject } from 'react'
import html2pdf from 'html2pdf.js'
import type { EventType } from '../types'

type Props = {
  eventType: EventType
  previewRef: RefObject<HTMLDivElement | null>
}

export default function DownloadPdfButton({ eventType, previewRef }: Props) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    if (downloading) return
    const node = previewRef.current
    if (!node) return
  
    try {
      setDownloading(true)
  
      const originalRadius = node.style.borderRadius
      node.style.borderRadius = "0px"
  
      await html2pdf()
        .from(node)
        .set({
          margin: 0,
          filename: `${eventType}-invitation.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: {
            unit: "px",
            format: [node.offsetWidth, node.offsetHeight],
            orientation: "portrait",
          },
        })
        .save()
  
      node.style.borderRadius = originalRadius
    } finally {
      setDownloading(false)
    }
  }

  return (
    <button
      className="downloadButton"
      type="button"
      onClick={handleDownload}
      disabled={downloading}
    >
      {downloading ? 'PDF hazırlanıyor...' : 'Download PDF'}
    </button>
  )
}

