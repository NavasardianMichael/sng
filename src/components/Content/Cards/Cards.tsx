import { FC, useCallback, useState } from 'react'
import IconLogo from 'assets/images/iconLogo.svg'
import { selectMaxioms } from 'store/maxiom/selectors'
import { selectUniversals } from 'store/posts/selectors'
import { Universal } from 'store/posts/types'
import { useAppSelector } from 'hooks/useAppSelector'
import { combineClassNames } from 'utils/classNames'
import styles from './Cards.module.scss'

const Cards: FC = () => {
  const { maxiomIdsByCmapId, maxiomsById } = useAppSelector(selectMaxioms)
  const { allIds: universalIds, byId: universalsById } = useAppSelector(selectUniversals)
  const [expandedUniversalIds, setExpandedUniversalIds] = useState<Record<Universal['id'], boolean>>({})

  const handleUniversalCardClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    const universalId = +e.currentTarget.name as Universal['id']
    setExpandedUniversalIds((prev) => ({
      ...prev,
      [universalId]: !prev[universalId],
    }))
  }, [])

  return (
    <div className={styles.cardsView}>
      <h2 className={styles.title}>
        Click a Universal Card to uncover <br /> your top three Maxioms.
      </h2>
      <div className={styles.cards}>
        {universalIds.map((universalId) => {
          const { colorHEX, text, pinnedCmapIds } = universalsById[universalId]
          if (!pinnedCmapIds.length) return null
          return (
            <button
              key={universalId}
              name={universalId.toString()}
              style={{ backgroundColor: colorHEX }}
              className={styles.card}
              onClick={handleUniversalCardClick}
              disabled={!pinnedCmapIds.length}
            >
              <div
                className={combineClassNames(
                  styles.layer,
                  styles.collapsed,
                  !expandedUniversalIds[universalId] && styles.show
                )}
              >
                <h3 className={styles.universalName}>{text.split('/').join('')}</h3>
                <div className={styles.logo}>
                  <IconLogo />
                </div>
              </div>
              <div
                className={combineClassNames(
                  styles.layer,
                  styles.expanded,
                  expandedUniversalIds[universalId] && styles.show
                )}
              >
                <h3 className={styles.universalName}>{text}</h3>
                <div className={styles.cmapWrapper} style={{ backgroundColor: colorHEX }}>
                  <div className={styles.cmap}>
                    {pinnedCmapIds.map((cmapId) => {
                      const maxiomIds = maxiomIdsByCmapId[cmapId]
                      return (
                        <div key={cmapId} className={styles.maxioms}>
                          {carIds.map((carId) => {
                            const car = carsById[carId]
                            return (
                              <p key={carId} className={styles.maxiom}>
                                {car.year}
                              </p>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Cards
