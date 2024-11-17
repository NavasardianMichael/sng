import { object } from 'yup'
import { COMMON_SCHEMA_GENERATORS } from './commons'

export const LOGIN_FORM_INITIAL_VALUES = {
  email: '',
  password: '',
} as const

export const LOGIN_FORM_VALIDATION_SCHEMA = object({
  email: COMMON_SCHEMA_GENERATORS.email,
  password: COMMON_SCHEMA_GENERATORS.password,
})
