import { FC } from 'react'
import classNames from 'classnames'
import { selectAppOptions } from 'store/app/selectors'
import { useAppSelector } from 'hooks/useAppSelector'
import { checkIsReadOnlyMode } from 'helpers/app'
import { Content } from 'components/Content/Content'
import Header from 'components/Header/Header'
import Loader from 'components/ui/Loader/Loader'
import styles from './Main.module.scss'

const Main: FC = () => {
  const { isPending } = useAppSelector(selectAppOptions)

  if (isPending) return <Loader />

  return (
    <div className={classNames(styles.main, { ['read-only']: checkIsReadOnlyMode() })}>
      <Header />
      <Content />
    </div>
  )
}

export default Main
