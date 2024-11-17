import { PINNED_CMAP_IDS_BY_UNIVERSAL_ID_MOCK } from 'constants/mock'
import { Universal, UniversalsSlice } from 'store/posts/types'
import { GetUniversalsAPI } from './types'

export const processGetUniversalsResponse: GetUniversalsAPI['processor'] = (response) => {
  const { legends, multipleColorMaxCount } = response.result
  const normalizedUniversals = legends.reduce(
    (acc, universal) => {
      const processedUniversal = processUniversalResponse(universal)

      acc.byId[processedUniversal.id] = processedUniversal
      acc.allIds.push(processedUniversal.id)
      return acc
    },
    {
      byId: {},
      allIds: [],
    } as UniversalsSlice['list']
  )

  return {
    list: normalizedUniversals,
    multipleColorMaxCount,
  }
}

export const processUniversalResponse = (
  universalResponse: GetUniversalsAPI['response']['legends'][number]
): Universal => {
  const { id, colorHEX, text } = universalResponse
  return { id: +id, colorHEX, text, pinnedCmapIds: PINNED_CMAP_IDS_BY_UNIVERSAL_ID_MOCK[id] }
}
