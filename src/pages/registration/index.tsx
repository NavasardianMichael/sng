import { Typography } from '@mui/material'
import { useQueryParams } from 'hooks/useQueryParams'
import { ROLES } from 'constants/profile'
import { RegistrationForm } from './Form'

const Registration = () => {
  const queryParams = useQueryParams()
  const roleNames = Object.keys(ROLES) as (keyof typeof ROLES)[]

  return (
    <>
      <Typography align="center" variant="h4" gutterBottom>
        Welcome to Registration
      </Typography>
      <Typography paragraph textAlign="center">
        Your email <strong>{queryParams.email}</strong> <br /> with a role{' '}
        <strong>{roleNames.find((key) => ROLES[key] === +queryParams.role)}</strong> has been successfully invited to
        register.
      </Typography>
      <RegistrationForm />
    </>
  )
}

export default Registration
