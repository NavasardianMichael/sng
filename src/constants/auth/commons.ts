import { Profile } from 'store/types'
import { ROLES } from 'constants/profile'
import { generateRequiredStringSchema } from 'utils/commons'

export const COMMON_SCHEMA_GENERATORS = {
  email: generateRequiredStringSchema('email').email('Enter a valid email'),
  password: generateRequiredStringSchema('newPassword').min(8, 'Password should be of minimum 8 characters length'),
}

export const PROFILE_INITIAL_DATA: Profile = {
  email: '',
  role: ROLES.admin,
}
