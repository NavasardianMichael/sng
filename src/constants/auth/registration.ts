import { object, ref } from 'yup'
import { COMMON_SCHEMA_GENERATORS } from './commons'

export const REGISTRATION_FORM_INITIAL_VALUES = {
  newPassword: '',
  confirmPassword: '',
}

export const REGISTRATION_FORM_TEMPLATE = [
  {
    name: 'newPassword',
    type: 'password',
    placeholder: 'Enter Password',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm Password',
  },
] as const

export const REGISTRATION_FORM_VALIDATION_SCHEMA = object({
  newPassword: COMMON_SCHEMA_GENERATORS.password,
  confirmPassword: COMMON_SCHEMA_GENERATORS.password.oneOf([ref('newPassword')], 'Passwords must match'),
})
