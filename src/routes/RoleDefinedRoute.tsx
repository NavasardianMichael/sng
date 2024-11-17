import { PRIVATE_PAGES } from 'constants/pages'
import { ROLES } from 'constants/profile'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { selectProfileData } from 'store/selectors'

export const RoleDefinedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { role } = useAppSelector(selectProfileData) 

  if (role !== ROLES.admin) return <Navigate to={PRIVATE_PAGES.home} />

  return children
}
