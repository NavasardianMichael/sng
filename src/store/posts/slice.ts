import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { STATE_SLICE_NAMES } from 'constants/store'
import { PostsSlice, PostsActionPayloads } from './types'

const initialState: PostsSlice = {
  list: {
    allIds: [],
    byId: {}
  },
  currentPostId: '',
  favoritePostIds: []
}

export const { reducer: postsReducer, actions } = createSlice({
  name: STATE_SLICE_NAMES.posts,
  initialState,
  reducers: {
    initPosts: (state, { payload }: PayloadAction<PostsActionPayloads['initPosts']>) => {
      state.list = payload
      state.currentPostId = payload.allIds[0]
    },
    addPost: (state, { payload }: PayloadAction<PostsActionPayloads['addPost']>) => {
      state.list.byId[payload.id] = payload
      state.list.allIds.push(payload.id)
    },
    editPost: (state, { payload }: PayloadAction<PostsActionPayloads['editPost']>) => {
      state.list.byId[payload.id] = payload
    },
    deletePost: (state, { payload }: PayloadAction<PostsActionPayloads['deletePost']>) => {
      state.list.allIds = state.list.allIds.filter(postId => postId !== payload.id)
      delete state.list.byId[payload.id]
    },
  },
})

export const { initPosts, addPost, editPost, deletePost } = actions

export default postsReducer
