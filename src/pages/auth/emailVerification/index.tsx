import { Typography } from 'antd'

const EmailVerification = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Typography.Title level={4}>Follow the Instructions in the Email.</Typography.Title>
      <Typography.Paragraph>
        We've sent a confirmation email to the address you provided. Please check your inbox to confirm your email
        address and complete the process.
      </Typography.Paragraph>
    </div>
  )
}

export default EmailVerification
