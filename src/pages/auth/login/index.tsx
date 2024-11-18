import { Typography } from 'antd'
import { selectIsProfileSlicePending } from 'store/profile/selectors'
import { useAppSelector } from 'hooks/useAppSelector'
import Loader from 'components/_shared/Loader/Loader'
import { LoginForm } from './Form'

const Login = () => {
  const isPending = useAppSelector(selectIsProfileSlicePending)

  if (isPending) return <Loader />

  return (
    <>
      <Typography.Title level={4}>You Are Welcome</Typography.Title>
      <LoginForm />
    </>
  )
}

export default Login
