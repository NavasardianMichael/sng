import { REPETITION_MAXIOMS_MOCK } from 'constants/mock'
import { Maxiom, MaxiomsSlice } from 'store/maxiom/types'
import { GetMaxiomsAPI } from './types'

export const processGetMaxiomsResponse: GetMaxiomsAPI['processor'] = (response) => {
  console.log({ 'response.result': response.result })

  const normalizedMaxioms = response.result
    // .map((r) => ({ ...r, height: 0, width: 0 }))
    .concat(REPETITION_MAXIOMS_MOCK)
    .reduce(
      (acc, maxiom) => {
        const processedMaxiom = processMaxiomResponse(maxiom)
        if (!acc.cmapIds.includes(processedMaxiom.cmapId)) acc.cmapIds.push(processedMaxiom.cmapId)
        if (!acc.maxiomIdsByCmapId) acc.maxiomIdsByCmapId = {}
        if (!acc.maxiomIdsByCmapId[processedMaxiom.cmapId]) acc.maxiomIdsByCmapId[processedMaxiom.cmapId] = []
        acc.maxiomIdsByCmapId[processedMaxiom.cmapId].push(processedMaxiom.id)
        acc.maxiomsById[processedMaxiom.id] = processedMaxiom
        return acc
      },
      {
        cmapIds: [],
        maxiomsById: {},
        maxiomIdsByCmapId: {},
      } as Omit<MaxiomsSlice, 'expandedCmapId' | 'colorizingMaxiomId'>
    )

  console.log({ normalizedMaxioms })

  return normalizedMaxioms
}

export const processMaxiomResponse = (maxiomResponse: GetMaxiomsAPI['response'][number]): Maxiom => {
  const { maxiomId, colors, maxiom, isRepetition, ...rest } = maxiomResponse
  return {
    ...rest,
    maxiom: maxiom.split('^').join('\n'),
    id: maxiomId,
    isRepetition: isRepetition ?? false,
    universalIds: colors
      .slice(0, 3)
      .filter((color) => !!color.colorId)
      .map((color) => color.colorId),
  }
}
