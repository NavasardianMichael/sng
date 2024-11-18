import axiosInstance from 'api/axiosInstance'
import { APIResponse } from 'helpers/types/api'
import { handleAPIError, paramsToQueryString } from 'helpers/functions/api'
import { ENDPOINTS } from './endpoints'
import {
  processCreatePostResponse,
  processDeletePostResponse,
  processEditPostResponse,
  processGetPostsResponse,
} from './processors'
import { CreatePostAPI, DeletePostAPI, EditPostAPI, GetPostsAPI } from './types'

export const getPostsAPI: GetPostsAPI['api'] = async (params) => {
  const { data } = await axiosInstance.get<APIResponse<GetPostsAPI['response']>>(
    `/${ENDPOINTS.getPosts}?${paramsToQueryString(params)}`
  )
  handleAPIError(data)
  const processedResponse = processGetPostsResponse(data)
  return processedResponse
}

export const createPostAPI: CreatePostAPI['api'] = async (params) => {
  const { data } = await axiosInstance.post<APIResponse<CreatePostAPI['response']>>(ENDPOINTS.createPost, params)
  handleAPIError(data)
  const processedResponse = processCreatePostResponse(data)
  return processedResponse
}

export const editPostAPI: EditPostAPI['api'] = async (params) => {
  const { data } = await axiosInstance.post<APIResponse<EditPostAPI['response']>>(ENDPOINTS.editPost, params)
  handleAPIError(data)
  const processedResponse = processEditPostResponse(data)
  return processedResponse
}

export const deletePostAPI: DeletePostAPI['api'] = async (params) => {
  const { data } = await axiosInstance.delete<APIResponse<DeletePostAPI['response']>>(ENDPOINTS.deletePost, {
    data: params,
  })
  handleAPIError(data)
  const processedResponse = processDeletePostResponse(data)
  return processedResponse
}
