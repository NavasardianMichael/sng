import { ENDPOINTS } from 'constants/api'
import axiosInstance from 'api/axiosInstance'
import { APIResponse } from 'types/api'
import { handleApiError, paramsToQueryString } from 'helpers/api'
import { processGetMaxiomsResponse } from './processors'
import { GetMaxiomsAPI } from './types'

export const getMaxiomsAPI: GetMaxiomsAPI['api'] = async ({ fileName }) => {
  const params = { fileName }

  const { data } = await axiosInstance.get<APIResponse<GetMaxiomsAPI['response']>>(
    `/${ENDPOINTS.getMaxioms}?${paramsToQueryString(params)}`
  )

  handleApiError(data)

  const processedMaxioms = processGetMaxiomsResponse(data)

  return processedMaxioms
}
