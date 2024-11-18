import { GetMiniEntitiesAPI } from './types'

export const processMiniEntitiesResponse: GetMiniEntitiesAPI['processor'] = (response) => {
  return response.value
}
