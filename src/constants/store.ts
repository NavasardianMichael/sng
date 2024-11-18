export const STATE_SLICE_NAMES = {
  profile: 'profile',
  posts: 'posts',
  miniEntities: 'miniEntities'
} as const

export const INITIAL_NORMALIZED_STATE = {
  allIds: [],
  byId: {}
}