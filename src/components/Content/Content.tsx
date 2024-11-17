import { FC, Suspense } from 'react'
import { VIEW_TEMPLATE } from 'constants/app'
import { selectAppOptions } from 'store/app/selectors'
import { useAppSelector } from 'hooks/useAppSelector'
import Loader from 'components/Loader/Loader'
import styles from './Content.module.scss'

export const Content: FC = () => {
  const { activeView } = useAppSelector(selectAppOptions)

  const { ContentComponent } = VIEW_TEMPLATE[activeView]
  return (
    <div className={styles.content}>
      <Suspense fallback={<Loader />}>
        <ContentComponent />
      </Suspense>
    </div>
  )
}
