import { RootState } from 'store/main'

export const selectPosts = (state: RootState) => state.posts.list

export const selectCurrentPostId = (state: RootState) => state.posts.currentPostId

export const selectFavoritePostIds = (state: RootState) => state.posts.favoritePostIds
