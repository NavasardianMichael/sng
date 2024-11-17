import { Post, PostsSlice } from 'store/posts/types'
import { CreatePostAPI, DeletePostAPI, EditPostAPI, GetPostsAPI } from './types'

export const processGetPostsResponse: GetPostsAPI['processor'] = (response) => {
  const normalizedPosts = response.result
    .reduce(
      (acc, post) => {
        const processedPost = processPostResponse(post)
        acc.byId[processedPost.id] = processedPost
        acc.allIds.push(processedPost.id)
        return acc
      },
      {
        allIds: [],
        byId: {}
      } as PostsSlice['list']
    )

  return normalizedPosts
}

export const processCreatePostResponse: CreatePostAPI['processor'] = (response) => {
  return processPostResponse(response.result)
}

export const processEditPostResponse: EditPostAPI['processor'] = (response) => {
  return processPostResponse(response.result)
}

export const processDeletePostResponse: DeletePostAPI['processor'] = () => {
  return
}

export const processPostResponse = (postResponse: GetPostsAPI['response'][number]): Post => {
  return postResponse
}
