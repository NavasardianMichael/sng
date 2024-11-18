import { FC } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import FloatingError from 'components/FloatingError'
import Loader from 'components/ui/Loader/Loader'

const RoutesContainer: FC = () => {
  const navigation = useNavigation()

  const isLoading = navigation.state === 'loading'

  if (isLoading) return <Loader />

  return (
    <>
      <FloatingError />
      <Outlet />
    </>
  )
}

export default RoutesContainer
