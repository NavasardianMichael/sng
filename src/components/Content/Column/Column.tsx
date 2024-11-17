import { FC, useCallback } from 'react'
import { selectMaxioms } from 'store/maxiom/selectors'
import { Cmap } from 'store/maxiom/types'
import { selectUniversals } from 'store/posts/selectors'
import { pinCmapIdToUniversalThunk, unpinCmapIdFromUniversalThunk } from 'store/posts/thunk'
import { Universal } from 'store/posts/types'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { useColumnViewStructure } from 'hooks/useColumnViewStructure'
import MaxiomsBox from './MaxiomBox/MaxiomBox'
import styles from './Column.module.scss'

const Column: FC = () => {
  const dispatch = useAppDispatch()
  const { allIds: universalIds, byId: universalsById } = useAppSelector(selectUniversals)
  const { maxiomsById, maxiomIdsByCmapId } = useAppSelector(selectMaxioms)
  console.log({ maxiomIdsByCmapId })

  const columnViewStructure = useColumnViewStructure()

  const onPinClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const dataset = e.currentTarget.dataset
      console.log({ dataset })

      const universalId = +dataset.universalId!
      const cmapId = dataset.cmapId!
      dispatch(pinCmapIdToUniversalThunk({ cmapId, universalId }))
    },
    [dispatch]
  )

  const onUnpinClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const dataset = e.currentTarget.dataset
      const universalId = +dataset.universalId! as Universal['id']
      const cmapId = dataset.cmapId! as Cmap['id']
      dispatch(unpinCmapIdFromUniversalThunk({ cmapId, universalId }))
    },
    [dispatch]
  )

  return (
    <div className={styles.column}>
      <div className={styles.universals}>
        {universalIds.map((universalId) => {
          const universal = universalsById[universalId]
          const cmapIds = columnViewStructure[universal.id]
          return (
            <section aria-labelledby={universal.text} key={universal.id} className={styles.universal}>
              <header>
                <div className={styles.primaryInfo} style={{ backgroundColor: universal.colorHEX }}>
                  <span className={styles.identifier}>{universal.id}</span>
                  <span className={styles.count}>{cmapIds.length}</span>
                </div>
                <h2 className={styles.title}>{universal.text}</h2>
              </header>
            </section>
          )
        })}
      </div>
      <div className={styles.cmapListContainer}>
        {universalIds.map((universalId) => {
          const universal = universalsById[universalId]
          const cmapIds = columnViewStructure[universal.id]
          const pinnedToTopCmapIds = [
            ...universal.pinnedCmapIds,
            ...cmapIds.filter((cmapId) => !universal.pinnedCmapIds.includes(cmapId)),
          ]
          console.log({ pinnedToTopCmapIds })

          return (
            <div key={universalId} className={styles.cmapList}>
              {pinnedToTopCmapIds.map((cmapId) => {
                const maxioms = maxiomIdsByCmapId[cmapId].map((maxiomId) => maxiomsById[maxiomId])
                return (
                  <MaxiomsBox
                    key={cmapId}
                    maxioms={maxioms}
                    universalsById={universalsById}
                    activeUniversalId={universalId}
                    onPinClick={onPinClick}
                    onUnpinClick={onUnpinClick}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Column
