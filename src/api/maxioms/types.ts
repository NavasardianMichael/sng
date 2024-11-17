import { Maxiom, MaxiomsSlice } from 'store/maxiom/types'
import { SettingsSlice } from 'store/settings/types'
import { Endpoint } from 'types/api'

export type GetMaxiomsAPI = Endpoint<{
  payload: Pick<SettingsSlice, 'fileName'>
  response: MaxiomResponse[]
  processed: Omit<MaxiomsSlice, 'expandedCmapId' | 'colorizingMaxiomId'>
}>

type MaxiomResponse = Pick<
  Maxiom,
  'maxiom' | 'posinconcept' | 'cmapId' | 'parentCmapId' | 'xPos' | 'yPos' | 'width' | 'height'
> & {
  maxiomId: Maxiom['id']
  isRepetition: boolean
  colors: {
    colorId: number
    orderId: number
  }[]
}
