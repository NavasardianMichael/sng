import { FC, PropsWithChildren } from 'react'
import { useAuth } from 'hooks/useAuth'
import { checkIsReadOnlyMode } from 'helpers/app'

const AuthWrapper: FC<PropsWithChildren> = ({ children }) => {
  useAuth()

  if (checkIsReadOnlyMode()) return <>{children}</>

  return <>{children}</>
}

export default AuthWrapper
