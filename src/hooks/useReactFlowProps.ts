import { useCallback, useMemo } from 'react'
import { Edge, Node } from '@xyflow/react'
import { selectMaxioms } from 'store/maxiom/selectors'
import { setExpandedCmapId } from 'store/maxiom/slice'
import { selectUniversals } from 'store/posts/selectors'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'

export const useReactFlowProps = () => {
  const { cmapIds, maxiomIdsByCmapId, maxiomsById, expandedCmapId, colorizingMaxiomId } = useAppSelector(selectMaxioms)
  const { byId: universalsById } = useAppSelector(selectUniversals)
  const dispatch = useAppDispatch()

  const toggleExpandedCmapId: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation()
      const cmapId = e.currentTarget.name
      dispatch(setExpandedCmapId(cmapId === expandedCmapId ? '' : cmapId))
    },
    [dispatch, expandedCmapId]
  )

  const maxiomIdsOfExpandedCmap = useMemo(() => maxiomIdsByCmapId[expandedCmapId], [expandedCmapId, maxiomIdsByCmapId])
  const firstMaxiomOfExpandedCmap = useMemo(
    () => maxiomsById[maxiomIdsOfExpandedCmap?.[0]],
    [maxiomIdsOfExpandedCmap, maxiomsById]
  )

  const linesCountToPullDown = useMemo(() => {
    return maxiomIdsOfExpandedCmap?.reduce((acc, maxiomId) => {
      const maxiom = maxiomsById[maxiomId]
      if (!maxiom.isRepetition) return acc
      return acc + Math.ceil(maxiom.maxiom.length / 36)
    }, 0)
  }, [maxiomIdsOfExpandedCmap, maxiomsById])

  const reactFlowProps = useMemo(() => {
    return cmapIds.reduce(
      (acc, cmapId) => {
        const maxiomIds = maxiomIdsByCmapId[cmapId]
        const firstMaxiom = maxiomsById[maxiomIds[0]]
        const maxioms = maxiomIdsByCmapId[cmapId].map((maxiomId) => {
          return maxiomsById[maxiomId]
        })

        const isCurrentMaxiomUnderExpandedCmap = firstMaxiom.yPos > firstMaxiomOfExpandedCmap?.yPos

        const node: Node = {
          id: cmapId,
          type: 'maxiomNode',
          position: {
            x: firstMaxiom.xPos,
            y: firstMaxiom.yPos + (expandedCmapId && isCurrentMaxiomUnderExpandedCmap ? linesCountToPullDown * 9 : 0),
          },
          data: {
            maxioms,
            toggleExpandedCmapId,
            universalsById,
            expandedCmapId,
            colorizingMaxiomId,
            repetitionMaxiomIds: maxioms.filter((maxiom) => maxiom.isRepetition).map((maxiom) => maxiom.id),
          },
        }
        acc.nodes.push(node)

        if (firstMaxiom.parentCmapId) {
          const edge: Edge = {
            id: `${firstMaxiom.parentCmapId}-${firstMaxiom.cmapId}`,
            type: 'maxiomEdge',
            source: firstMaxiom.parentCmapId,
            target: firstMaxiom.cmapId,
          }
          acc.edges.push(edge)
        }

        return acc
      },
      {
        nodes: [] as Node[],
        edges: [] as Edge[],
      }
    )
  }, [
    cmapIds,
    colorizingMaxiomId,
    expandedCmapId,
    firstMaxiomOfExpandedCmap?.yPos,
    linesCountToPullDown,
    maxiomIdsByCmapId,
    maxiomsById,
    toggleExpandedCmapId,
    universalsById,
  ])

  return reactFlowProps
}
