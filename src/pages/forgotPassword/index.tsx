import { Typography } from 'antd'
import { ForgotPasswordForm } from './Form'

const ForgotPassword = () => {
  return (
    <>
      <Typography.Title level={4}>Forgot your password?</Typography.Title>
      <Typography.Paragraph>
        Please enter the email address associated with your account. <br /> We'll send you a link to reset your
        password.
      </Typography.Paragraph>
      <ForgotPasswordForm />
    </>
  )
}

export default ForgotPassword
