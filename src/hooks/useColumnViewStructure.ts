import { useMemo } from 'react'
import { selectMaxioms } from 'store/maxiom/selectors'
import { Cmap } from 'store/maxiom/types'
import { Universal } from 'store/posts/types'
import { useAppSelector } from './useAppSelector'

export const useColumnViewStructure = () => {
  const { cmapIds, maxiomIdsByCmapId, maxiomsById } = useAppSelector(selectMaxioms)
  const columnViewStructure = useMemo(() => {
    return cmapIds.reduce(
      (acc, cmapId) => {
        maxiomIdsByCmapId[cmapId].forEach((maxiomId) => {
          maxiomsById[maxiomId].universalIds.forEach((universalId) => {
            if (!acc[universalId]) acc[universalId] = []
            if (!acc[universalId].includes(cmapId)) acc[universalId].push(cmapId)
          })
        })

        return acc
      },
      {} as Record<Universal['id'], Cmap['id'][]>
    )
  }, [cmapIds, maxiomIdsByCmapId, maxiomsById])

  return columnViewStructure
}
