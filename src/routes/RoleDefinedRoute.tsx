import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { selectProfileData } from 'store/profile/selectors'
import { useAppSelector } from 'hooks/useAppSelector'
import { ROLES } from 'helpers/constants/auth/profile'
import { PRIVATE_PAGES } from 'helpers/constants/pages'

export const RoleDefinedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { role } = useAppSelector(selectProfileData)

  if (role !== ROLES.admin) return <Navigate to={PRIVATE_PAGES.home} />

  return children
}
