import { APIResponse } from 'types/api'

export const handleAPIError = (response: APIResponse<unknown>) => {
  if (response.error.code === 200) return
  throw Error(response.error.description)
}

export const paramsToQueryString = (params: Record<string, string>) => {
  if (!Object.keys(params).length) return ''
  return new URLSearchParams(params).toString()
}

export const getMockAsFakeAPI = async (data: unknown) => {
  return Promise.resolve(data)
}