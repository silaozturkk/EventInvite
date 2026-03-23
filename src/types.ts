export type EventType = 'birthday' | 'wedding' | 'party' | 'graduation'

export type FieldInputType = 'text' | 'number' | 'date' | 'time' | 'textarea'

export type FormFieldKey =
  | 'name'
  | 'age'
  | 'date'
  | 'time'
  | 'location'
  | 'message'
  | 'brideName'
  | 'groomName'
  | 'venue'
  | 'eventName'
  | 'dressCode'
  | 'studentName'
  | 'degree'

export type FormState = Partial<Record<FormFieldKey, string>>

export type FieldConfig = {
  key: FormFieldKey
  label: string
  inputType: FieldInputType
  placeholder?: string
}

