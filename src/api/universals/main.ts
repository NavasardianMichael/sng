import { ENDPOINTS } from 'constants/api'
import axiosInstance from 'api/axiosInstance'
import { APIResponse } from 'types/api'
import { handleAPIError, paramsToQueryString } from 'helpers/api'
import { processGetUniversalsResponse } from './processors'
import { GetUniversalsAPI, PinCmapToUniversalAPI, UnpinCmapIdFromUniversalAPI } from './types'

export const getUniversalsAPI: GetUniversalsAPI['api'] = async ({ fileName }) => {
  const params = { fileName }
  const { data } = await axiosInstance.get<APIResponse<GetUniversalsAPI['response']>>(
    `/${ENDPOINTS.getUniversals}?${paramsToQueryString(params)}`
  )

  handleAPIError(data)

  const processedUniversals = processGetUniversalsResponse(data)

  return processedUniversals
}

export const pinCmapIdToUniversalAPI: PinCmapToUniversalAPI['api'] = async () => {
  const { data } = await axiosInstance.post<APIResponse<PinCmapToUniversalAPI['response']>>(
    `/${ENDPOINTS.pinCmapIdToMaxiom}`
  )

  handleAPIError(data)
}

export const unpinCmapIdFromUniversalAPI: UnpinCmapIdFromUniversalAPI['api'] = async () => {
  const { data } = await axiosInstance.post<APIResponse<UnpinCmapIdFromUniversalAPI['response']>>(
    `/${ENDPOINTS.unpinCmapIdToMaxiom}`
  )

  handleAPIError(data)
}
