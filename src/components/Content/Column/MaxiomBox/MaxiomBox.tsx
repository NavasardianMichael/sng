import { FC, memo, useMemo } from 'react'
import { Maxiom } from 'store/maxiom/types'
import { Universal, UniversalsSlice } from 'store/posts/types'
import { combineClassNames } from 'utils/classNames'
import MaxiomsList from './MaxiomList/MaxiomList'
import styles from './MaxiomBox.module.scss'

export type MaxiomBoxProps = {
  maxioms: Maxiom[]
  universalsById: UniversalsSlice['list']['byId']
  activeUniversalId: Universal['id']
  onPinClick: React.MouseEventHandler<HTMLButtonElement>
  onUnpinClick: React.MouseEventHandler<HTMLButtonElement>
}

const MaxiomsBox: FC<MaxiomBoxProps> = ({ maxioms, universalsById, activeUniversalId, onPinClick, onUnpinClick }) => {
  const { pinnedCmapIds } = universalsById[activeUniversalId]
  const currentCmapPinnedIndex = pinnedCmapIds.indexOf(maxioms[0].cmapId)
  const isCurrentCmapPinned = currentCmapPinnedIndex > -1

  const pinCmapActionContent = useMemo(() => {
    if (!isCurrentCmapPinned && pinnedCmapIds.length === 3) return null
    return isCurrentCmapPinned ? '-' : '+'
  }, [isCurrentCmapPinned, pinnedCmapIds.length])

  return (
    <div className={styles.box}>
      <MaxiomsList {...{ maxioms, universalsById, activeUniversalId }} />
      {!!pinCmapActionContent && (
        <div className={styles.pinner}>
          {isCurrentCmapPinned && (
            <button key={maxioms[0].cmapId} className={combineClassNames(styles.primary, styles.layer)}>
              {currentCmapPinnedIndex + 1}
            </button>
          )}
          {
            <button
              className={combineClassNames(styles.primary, styles.layer, styles.hover)}
              data-cmap-id={maxioms[0].cmapId}
              data-universal-id={activeUniversalId}
              onClick={isCurrentCmapPinned ? onUnpinClick : onPinClick}
            >
              {pinCmapActionContent}
            </button>
          }
          <button
            disabled
            className={combineClassNames(styles.secondary, styles.layer, !isCurrentCmapPinned && styles.hover)}
          ></button>
        </div>
      )}
    </div>
  )
}

export default memo(MaxiomsBox)
