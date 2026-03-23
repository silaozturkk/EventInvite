import type {
  EventType,
  FieldConfig,
  FieldInputType,
  FormFieldKey,
  FormState,
} from '../types'

export type PreviewLine = {
  label: string
  getValue: (value: FormState) => string
}

export type EventConfig = {
  type: EventType
  navLabel: string
  themeClass: string
  fields: FieldConfig[]
  preview: {
    heading: (value: FormState) => string
    title: (value: FormState) => string
    lines: PreviewLine[]
    message: (value: FormState) => string
    emptyMessage: string
  }
}

const getOr = (value: FormState, key: FormFieldKey, fallback: string) =>
  value[key]?.trim() ? String(value[key]) : fallback

const mkInput = (key: FormFieldKey, label: string, inputType: FieldInputType, placeholder?: string): FieldConfig => ({
  key,
  label,
  inputType,
  placeholder,
})

const birthdayFields: FieldConfig[] = [
  mkInput('name', 'İsim', 'text', 'Örn: Ayşe'),
  mkInput('age', 'Yaş', 'number', 'Örn: 25'),
  mkInput('date', 'Tarih', 'date'),
  mkInput('time', 'Saat', 'time'),
  mkInput('location', 'Konum', 'text', 'Örn: İstanbul / Kadıköy'),
  mkInput('message', 'Mesaj', 'textarea', 'Kısa davet mesajınızı yazın...'),
]

const weddingFields: FieldConfig[] = [
  mkInput('brideName', 'Gelin Adı', 'text', 'Örn: Elif'),
  mkInput('groomName', 'Damat Adı', 'text', 'Örn: Can'),
  mkInput('date', 'Tarih', 'date'),
  mkInput('time', 'Saat', 'time'),
  mkInput('venue', 'Mekan', 'text', 'Örn: Beşiktaş / X Salonu'),
  mkInput('message', 'Mesaj', 'textarea', 'Sizi aramızda görmekten mutluluk duyarız...'),
]

const partyFields: FieldConfig[] = [
  mkInput('eventName', 'Etkinlik Adı', 'text', 'Örn: 18. Yaş Partisi'),
  mkInput('date', 'Tarih', 'date'),
  mkInput('time', 'Saat', 'time'),
  mkInput('location', 'Konum', 'text', 'Örn: Ankara / Çankaya'),
  mkInput('dressCode', 'Dress Code', 'text', 'Örn: Neon'),
  mkInput('message', 'Mesaj', 'textarea', 'Eğlenceye hazır mısın?...'),
]

const graduationFields: FieldConfig[] = [
  mkInput('studentName', 'Mezun Adı', 'text', 'Örn: Sıla'),
  mkInput('degree', 'Bölüm / Derece', 'text', 'Örn: Bilgisayar Mühendisliği'),
  mkInput('date', 'Tarih', 'date'),
  mkInput('time', 'Saat', 'time'),
  mkInput('location', 'Konum', 'text', 'Örn: İzmir / Üniversite Kampüsü'),
  mkInput('message', 'Mesaj', 'textarea', 'Birlikte kutlamaya bekleriz...'),
]

export const EVENT_CONFIGS: Record<EventType, EventConfig> = {
  birthday: {
    type: 'birthday',
    navLabel: 'Doğum Günü',
    themeClass: 'invitation--birthday',
    fields: birthdayFields,
    preview: {
      heading: () => 'Davet',
      title: (v) => {
        const name = getOr(v, 'name', 'Misafir'),
          age = getOr(v, 'age', '')
        return age ? `${name} • ${age} Yaş` : name
      },
      lines: [
        { label: 'Tarih', getValue: (v) => getOr(v, 'date', 'Tarih seçin') },
        { label: 'Saat', getValue: (v) => getOr(v, 'time', 'Saat seçin') },
        {
          label: 'Konum',
          getValue: (v) => getOr(v, 'location', 'Konum seçin'),
        },
      ],
      message: (v) => getOr(v, 'message', ''),
      emptyMessage: 'Mesajınızı yazın...',
    },
  },
  wedding: {
    type: 'wedding',
    navLabel: 'Düğün',
    themeClass: 'invitation--wedding',
    fields: weddingFields,
    preview: {
      heading: () => 'Davet',
      title: (v) => {
        const bride = getOr(v, 'brideName', 'Gelin'),
          groom = getOr(v, 'groomName', 'Damat')
        return `${bride} & ${groom}`
      },
      lines: [
        { label: 'Tarih', getValue: (v) => getOr(v, 'date', 'Tarih seçin') },
        { label: 'Saat', getValue: (v) => getOr(v, 'time', 'Saat seçin') },
        {
          label: 'Mekan',
          getValue: (v) => getOr(v, 'venue', 'Mekan seçin'),
        },
      ],
      message: (v) => getOr(v, 'message', ''),
      emptyMessage: 'Mesajınızı yazın...',
    },
  },
  party: {
    type: 'party',
    navLabel: 'Parti',
    themeClass: 'invitation--party',
    fields: partyFields,
    preview: {
      heading: () => 'Davet',
      title: (v) => getOr(v, 'eventName', 'Etkinlik'),
      lines: [
        { label: 'Tarih', getValue: (v) => getOr(v, 'date', 'Tarih seçin') },
        { label: 'Saat', getValue: (v) => getOr(v, 'time', 'Saat seçin') },
        {
          label: 'Konum',
          getValue: (v) => getOr(v, 'location', 'Konum seçin'),
        },
        {
          label: 'Dress Code',
          getValue: (v) => getOr(v, 'dressCode', 'Belirtilmedi'),
        },
      ],
      message: (v) => getOr(v, 'message', ''),
      emptyMessage: 'Mesajınızı yazın...',
    },
  },
  graduation: {
    type: 'graduation',
    navLabel: 'Mezuniyet',
    themeClass: 'invitation--graduation',
    fields: graduationFields,
    preview: {
      heading: () => 'Davet',
      title: (v) => {
        const student = getOr(v, 'studentName', 'Mezun'),
          degree = getOr(v, 'degree', '')
        return degree ? `${student} • ${degree}` : student
      },
      lines: [
        { label: 'Tarih', getValue: (v) => getOr(v, 'date', 'Tarih seçin') },
        { label: 'Saat', getValue: (v) => getOr(v, 'time', 'Saat seçin') },
        {
          label: 'Konum',
          getValue: (v) => getOr(v, 'location', 'Konum seçin'),
        },
      ],
      message: (v) => getOr(v, 'message', ''),
      emptyMessage: 'Mesajınızı yazın...',
    },
  },
}

export const getEventConfig = (eventType: EventType) => EVENT_CONFIGS[eventType]

export const createEmptyFormState = (eventType: EventType): FormState => {
  const cfg = getEventConfig(eventType)
  const next: FormState = {}
  for (const field of cfg.fields) next[field.key] = ''
  return next
}

