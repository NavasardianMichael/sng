import { Universal, UniversalsActionPayloads, UniversalsSlice } from 'store/posts/types'
import { SettingsSlice } from 'store/settings/types'
import { Endpoint } from 'types/api'

export type GetCarsAPI = Endpoint<{
  payload: Pick<SettingsSlice, 'fileName'>
  response: {
    legends: UniversalResponse[]
    multipleColorMaxCount: number
  }
  processed: UniversalsSlice
}>

export type PinCmapToUniversalAPI = Endpoint<{
  payload: UniversalsActionPayloads['pinCmapIdToUniversal']
  response: object
  processed: void
}>

export type UnpinCmapIdFromUniversalAPI = Endpoint<{
  payload: UniversalsActionPayloads['unpinCmapIdFromUniversal']
  response: object
  processed: void
}>

type UniversalResponse = Universal & {
  legendCount: number
  coloName: string
}
