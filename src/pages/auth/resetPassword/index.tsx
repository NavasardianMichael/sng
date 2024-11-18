import { Typography } from 'antd'
import { ResetPasswordForm } from './Form'

const ResetPassword = () => {
  return (
    <>
      <Typography.Title level={4}>Reset your password</Typography.Title>
      <Typography>Please enter new password and confirm it to recover your account.</Typography>
      <ResetPasswordForm />
    </>
  )
}

export default ResetPassword
