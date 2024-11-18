import { createPostAPI, deletePostAPI, editPostAPI, getPostsAPI } from 'api/posts/main'
import { CreatePostAPI, DeletePostAPI, EditPostAPI, GetPostsAPI } from 'api/posts/types'
import { STATE_SLICE_NAMES } from 'helpers/constants/store'
import { createAppAsyncThunk } from 'helpers/functions/store'
import { addPost, deletePost, editPost, initPosts } from './slice'
import { Post, PostsSlice } from './types'

export const getPostsThunk = createAppAsyncThunk<PostsSlice['list'], GetPostsAPI['payload']>(
  `${STATE_SLICE_NAMES.posts}/getPosts`,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const posts = await getPostsAPI(params)
      dispatch(initPosts(posts))
      return posts
    } catch (e) {
      return rejectWithValue(e as Error)
    }
  }
)

export const createPostThunk = createAppAsyncThunk<Post, CreatePostAPI['payload']>(
  `${STATE_SLICE_NAMES.posts}/createPost`,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const post = await createPostAPI(params)
      dispatch(addPost(post))
      return post
    } catch (e) {
      return rejectWithValue(e as Error)
    }
  }
)

export const editPostThunk = createAppAsyncThunk<Post, EditPostAPI['payload']>(
  `${STATE_SLICE_NAMES.posts}/editPost`,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const post = await editPostAPI(params)
      dispatch(editPost(post))
      return post
    } catch (e) {
      return rejectWithValue(e as Error)
    }
  }
)

export const deletePostThunk = createAppAsyncThunk<void, DeletePostAPI['payload']>(
  `${STATE_SLICE_NAMES.posts}/deletePost`,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      await deletePostAPI(params)
      dispatch(deletePost(params))
    } catch (e) {
      return rejectWithValue(e as Error)
    }
  }
)
