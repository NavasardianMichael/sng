import { FC, memo } from 'react'
import { Universal } from 'store/posts/types'
import { MaxiomBoxProps } from '../MaxiomBox'
import styles from './MaxiomList.module.scss'

const getUniversalsGradient = (universals: Universal[], activeUniversalId: Universal['id']) => {
  if (!universals || universals.length === 0) return '#f7f5f4'

  const colorStops: string[] = []
  const segmentPercentage = 100 / universals.length

  universals.forEach((universal, index) => {
    const start = (index * segmentPercentage).toFixed(2)
    const end = ((index + 1) * segmentPercentage).toFixed(2)
    const color = !activeUniversalId || activeUniversalId === universal.id ? universal.colorHEX : '#f7f5f4'
    colorStops.push(`${color} ${start}%`, `${color} ${end}%`)
  })

  return `linear-gradient(to right, ${colorStops.join(', ')})`
}

const MaxiomsList: FC<Pick<MaxiomBoxProps, 'maxioms' | 'universalsById' | 'activeUniversalId'>> = ({
  maxioms,
  universalsById,
  activeUniversalId,
}) => {
  return (
    <div className={styles.cmaps}>
      {maxioms.map((maxiom) => {
        const colors = maxiom.universalIds.map((colorId) => {
          return universalsById[colorId]
        })

        const background = getUniversalsGradient(colors, activeUniversalId)
        return (
          <div key={maxiom.id} className={styles.maxiom} style={{ background: background ?? 'initial' }}>
            {maxiom.maxiom}
          </div>
        )
      })}
    </div>
  )
}

export default memo(MaxiomsList)
