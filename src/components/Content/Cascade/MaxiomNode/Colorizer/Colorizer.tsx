import { FC } from 'react'
import { Maxiom, MaxiomsSlice } from 'store/maxiom/types'
import styles from './Colorizer.module.scss'

type Props = {
  colorizingMaxiomId: MaxiomsSlice['colorizingMaxiomId']
  maxiom: Maxiom
}

export const Colorizer: FC<Props> = ({ colorizingMaxiomId, maxiom }) => {
  if (!colorizingMaxiomId || maxiom.id !== colorizingMaxiomId) return null
  return (
    <div className={styles.colorizer}>
      <h1>{colorizingMaxiomId}</h1>
    </div>
  )
}
