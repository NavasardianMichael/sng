import { Profile } from 'store/profile/types'
import { ROLES } from './auth/profile'

export const PROFILE_INITIAL_DATA: Profile = {
  email: '',
  role: ROLES.admin,
  phone: '123456789',
}
