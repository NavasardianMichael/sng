import axiosInstance from 'api/axiosInstance'
import { APIResponse } from 'helpers/types/api'
import { handleAPIError } from 'helpers/functions/api'
import { ENDPOINTS } from './endpoints'
import { processMiniEntitiesResponse } from './processors'
import { GetMiniEntitiesAPI } from './types'

export const getMiniEntitiesAPI: GetMiniEntitiesAPI['api'] = async () => {
  const { data } = await axiosInstance.get<APIResponse<GetMiniEntitiesAPI['response']>>(ENDPOINTS.getMiniEntitiesAPI)
  handleAPIError(data)
  const processedResponse = processMiniEntitiesResponse(data)
  return processedResponse
}
