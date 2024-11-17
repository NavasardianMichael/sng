import { Post, PostsSlice } from 'store/posts/types'
import { Endpoint } from 'types/api'

type PostResponse = Post

export type GetPostsAPI = Endpoint<{
  payload: Pick<Post, 'id'>
  response: PostResponse[]
  processed: PostsSlice['list']
}>

export type CreatePostAPI = Endpoint<{
  payload: Post
  response: PostResponse
  processed: Post
}>

export type EditPostAPI = Endpoint<{
  payload: Post
  response: PostResponse
  processed: Post
}>

export type DeletePostAPI = Endpoint<{
  payload: Pick<Post, 'id'>
  response: void
  processed: void
}>