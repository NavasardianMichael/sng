import { MiniEntitiesSlice } from 'store/miniEntities/types'
import { Endpoint } from 'helpers/types/api'

export type GetMiniEntitiesAPI = Endpoint<{
  payload: void
  response: MiniEntitiesSlice
  processed: MiniEntitiesSlice
}>
