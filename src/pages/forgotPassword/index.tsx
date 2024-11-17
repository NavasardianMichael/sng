import { Typography } from '@mui/material'
import { ForgotPasswordForm } from './Form'

const ForgotPassword = () => {
  return (
    <>
      <Typography align="center" variant="h4" gutterBottom>
        Forgot your password?
      </Typography>
      <Typography align="center" gutterBottom>
        Please enter the email address associated with your account. <br /> We'll send you a link to reset your
        password.
      </Typography>
      <ForgotPasswordForm />
    </>
  )
}

export default ForgotPassword
