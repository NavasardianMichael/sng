import { FC } from 'react'
import { BaseEdge, Edge, EdgeProps, getStraightPath } from '@xyflow/react'

type CustomEdge = Edge<{ value: number }, 'custom'>

const MaxiomEdge: FC<EdgeProps<CustomEdge>> = ({ id, sourceX, sourceY, targetX, targetY }) => {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  })

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ stroke: 'black', strokeWidth: '1' }} />
    </>
  )
}

export default MaxiomEdge
