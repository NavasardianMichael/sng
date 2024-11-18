import { Typography } from 'antd'
import { ROLES } from 'constants/auth/profile'
import { useQueryParams } from 'hooks/useQueryParams'
import { RegistrationForm } from './Form'

const Registration = () => {
  const queryParams = useQueryParams()
  const roleNames = Object.keys(ROLES) as (keyof typeof ROLES)[]

  return (
    <>
      <Typography.Title level={4}>Welcome to Registration</Typography.Title>
      <Typography.Paragraph>
        Your email <strong>{queryParams.email}</strong> <br /> with a role{' '}
        <strong>{roleNames.find((key) => ROLES[key] === +queryParams.role)}</strong> has been successfully invited to
        register.
      </Typography.Paragraph>
      <RegistrationForm />
    </>
  )
}

export default Registration
