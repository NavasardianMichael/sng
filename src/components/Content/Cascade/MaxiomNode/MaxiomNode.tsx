import { FC, Fragment } from 'react'
import { Handle, Node, NodeProps, Position } from '@xyflow/react'
import { Maxiom, MaxiomsSlice } from 'store/maxiom/types'
import { Universal, UniversalsSlice } from 'store/posts/types'
import { Colorizer } from './Colorizer/Colorizer'
import styles from './MaxiomNode.module.scss'

type Props = NodeProps<Node<NodeCustomProps>>

type NodeCustomProps = {
  maxioms: Maxiom[]
  universalsById: UniversalsSlice['list']['byId']
  expandedCmapId: MaxiomsSlice['expandedCmapId']
  colorizingMaxiomId: MaxiomsSlice['colorizingMaxiomId']
  toggleExpandedCmapId: React.MouseEventHandler<HTMLButtonElement>
  repetitionMaxiomIds: Maxiom['id'][]
}

const getUniversalsGradient = (colors: Universal['colorHEX'][]) => {
  if (!colors || colors.length === 0) return '#f7f5f4'

  const colorStops: string[] = []
  const segmentPercentage = 100 / colors.length

  colors.forEach((color, index) => {
    const start = (index * segmentPercentage).toFixed(2)
    const end = ((index + 1) * segmentPercentage).toFixed(2)
    colorStops.push(`${color} ${start}%`, `${color} ${end}%`)
  })

  return `linear-gradient(to right, ${colorStops.join(', ')})`
}

const MaxiomNode: FC<Props> = ({
  data: { maxioms, universalsById, expandedCmapId, colorizingMaxiomId, repetitionMaxiomIds, toggleExpandedCmapId },
}) => {
  const isCurrentCmapExpanded = expandedCmapId === maxioms[0].cmapId
  return (
    <div className={styles.cmap}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ visibility: 'hidden', position: 'absolute', top: '3px' }}
      />
      <div className={styles.mainBox}>
        {maxioms.map((maxiom) => {
          if (!isCurrentCmapExpanded && maxiom.isRepetition) return null
          const colors = maxiom.universalIds.map((colorId) => {
            return universalsById[colorId]?.colorHEX ?? 'red'
          })

          const background = getUniversalsGradient(colors)
          return (
            <Fragment key={maxiom.id}>
              <div
                key={maxiom.id}
                data-maxiom-id={maxiom.id}
                className={styles.maxiom}
                style={{ background: background ?? 'initial' }}
              >
                {maxiom.maxiom}
              </div>
              <Colorizer colorizingMaxiomId={colorizingMaxiomId} maxiom={maxiom} />
            </Fragment>
          )
        })}
      </div>
      {maxioms.some((maxiom) => maxiom.isRepetition) && (
        <button className={styles.toggleRepetitionsBtn} onClick={toggleExpandedCmapId} name={maxioms[0].cmapId}>
          {isCurrentCmapExpanded ? '-' : '+'}
        </button>
      )}
      {!isCurrentCmapExpanded && (
        <div className={styles.layers}>
          {repetitionMaxiomIds.slice(0, 2).map((repetitionId) => {
            return <div key={repetitionId} className={styles.bgLayer}></div>
          })}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ visibility: 'hidden', position: 'absolute', bottom: '3px' }}
      />
    </div>
  )
}

export default MaxiomNode
