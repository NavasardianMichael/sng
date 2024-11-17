import { Typography } from '@mui/material'
import { ResetPasswordForm } from './Form'

const ResetPassword = () => {
  return (
    <>
      <Typography align="center" variant="h4" gutterBottom>
        Reset your password
      </Typography>
      <Typography align="center" gutterBottom>
        Please enter new password and confirm it to recover your account.
      </Typography>
      <ResetPasswordForm />
    </>
  )
}

export default ResetPassword
