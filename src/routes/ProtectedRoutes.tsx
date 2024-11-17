import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { selectIsLoggedIn } from 'store/selectors'
import { useAppSelector } from 'hooks/useAppSelector'
import { PUBLIC_PAGES } from 'constants/pages'

export const ProtectedRoutes: FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  if (!isLoggedIn) return <Navigate to={PUBLIC_PAGES.login} />

  return <Outlet />
}
