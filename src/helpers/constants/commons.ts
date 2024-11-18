import { generateRequiredStringSchema } from 'helpers/functions/commons'

export const COMMON_SCHEMA_GENERATORS = {
  email: generateRequiredStringSchema('email').email('Enter a valid email'),
  password: generateRequiredStringSchema('newPassword').min(8, 'Password should be of minimum 8 characters length'),
}
