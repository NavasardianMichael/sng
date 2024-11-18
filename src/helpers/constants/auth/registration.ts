import { object, ref } from 'yup'
import { COMMON_SCHEMA_GENERATORS } from '../commons'

export const REGISTRATION_FORM_INITIAL_VALUES = {
  password: '',
  confirmedPassword: '',
}

export const REGISTRATION_FORM_TEMPLATE = [
  {
    name: 'password',
    type: 'password',
    placeholder: 'Enter Password',
  },
  {
    name: 'confirmedPassword',
    type: 'password',
    placeholder: 'Confirm Password',
  },
] as const

export const REGISTRATION_FORM_VALIDATION_SCHEMA = object({
  newPassword: COMMON_SCHEMA_GENERATORS.password,
  confirmPassword: COMMON_SCHEMA_GENERATORS.password.oneOf([ref('newPassword')], 'Passwords must match'),
})
