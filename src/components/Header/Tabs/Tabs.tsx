import { FC } from 'react'
import { VIEW_TEMPLATE, VIEW_TYPES_LIST } from 'constants/app'
import { selectAppOptions } from 'store/app/selectors'
import { setAppOptions } from 'store/app/slice'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { ViewType } from 'types/app'
import { combineClassNames } from 'utils/classNames'
import styles from './Tab.module.scss'

export const Tabs: FC = () => {
  const dispatch = useAppDispatch()
  const { activeView } = useAppSelector(selectAppOptions)

  const handleViewTabClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const tabName = e.currentTarget.name as ViewType
    dispatch(
      setAppOptions({
        activeView: tabName,
      })
    )
  }

  return (
    <div className={styles.tabs}>
      {VIEW_TYPES_LIST.map((tab) => {
        const { id, label, Icon } = VIEW_TEMPLATE[tab]
        return (
          <button
            key={id}
            name={id}
            className={combineClassNames(styles.tab, activeView === tab && styles.active)}
            onClick={handleViewTabClick}
          >
            <Icon />
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
