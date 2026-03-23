import type { EventType, FieldConfig, FormFieldKey, FormState } from '../types'
import { getEventConfig } from '../lib/eventConfigs'

type Props = {
  eventType: EventType
  value: FormState
  onChange: (next: FormState) => void
}

export default function DynamicForm({ eventType, value, onChange }: Props) {
  const cfg = getEventConfig(eventType)

  const handleFieldChange = (key: FormFieldKey, nextValue: string) => {
    onChange({
      ...value,
      [key]: nextValue,
    })
  }

  return (
    <form className="dynamicForm" aria-label="Dinamik form">
      {cfg.fields.map((field) => (
        <FormField
          key={field.key}
          field={field}
          value={value[field.key] ?? ''}
          onChange={(v) => handleFieldChange(field.key, v)}
        />
      ))}
    </form>
  )
}

function FormField({
  field,
  value,
  onChange,
}: {
  field: FieldConfig
  value: string
  onChange: (nextValue: string) => void
}) {
  if (field.inputType === 'textarea') {
    return (
      <label className="field">
        <span className="fieldLabel">{field.label}</span>
        <textarea
          className="fieldInput fieldTextarea"
          value={value}
          placeholder={field.placeholder ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    )
  }

  return (
    <label className="field">
      <span className="fieldLabel">{field.label}</span>
      <input
        className="fieldInput"
        type={field.inputType === 'number' ? 'number' : field.inputType}
        value={value}
        placeholder={field.placeholder ?? ''}
        maxLength={23}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

