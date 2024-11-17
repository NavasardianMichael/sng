import { APIResponse } from 'types/api'

export const handleApiError = (error: APIResponse<unknown>) => {
  if (error.statusCode === 200) return
  throw Error('Request status is not "success"')
}

export const paramsToQueryString = (params: Record<string, string>) => {
  if (!Object.keys(params).length) return ''
  return new URLSearchParams(params).toString()
}
