import { FC, useEffect, useMemo } from 'react'
import { EdgeTypes, NodeTypes, ReactFlow } from '@xyflow/react'
import { useReactFlowProps } from 'hooks/useReactFlowProps'
import MaxiomEdge from './MaxiomEdge'
import MaxiomNode from './MaxiomNode/MaxiomNode'
import styles from './Cascade.module.scss'
import '@xyflow/react/dist/style.css'

export const Cascade: FC = () => {
  const reactFlowProps = useReactFlowProps()
  useEffect(() => {
    console.log({ reactFlowProps })
  }, [reactFlowProps])

  const nodeTypes: NodeTypes = useMemo(
    () => ({
      maxiomNode: MaxiomNode,
    }),
    []
  )

  const edgeTypes: EdgeTypes = useMemo(
    () => ({
      maxiomEdge: MaxiomEdge,
    }),
    []
  )

  return (
    <div className={styles.cascade} style={{ width: '100%', height: 'calc(100vh - 87px)', zoom: 0.5 }}>
      <ReactFlow
        fitView
        onlyRenderVisibleElements
        className={styles.lib}
        nodes={reactFlowProps.nodes}
        edges={reactFlowProps.edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        // preventScrolling={false}
        // panOnDrag={false}
        nodesDraggable={false}
        // zoomOnPinch={false}
        // zoomOnScroll={false}
        zoomOnDoubleClick={false}
        edgesFocusable={false}
        proOptions={{ hideAttribution: true }}
        nodesConnectable={false}
        panOnDrag={true}
        nodesFocusable={false}
      />
    </div>
  )
}
