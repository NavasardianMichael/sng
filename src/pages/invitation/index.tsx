import { Typography } from '@mui/material'
import { InvitationForm } from './Form'

const Invitation = () => {
  return (
    <>
      <Typography align="center" variant="h4" gutterBottom>
        Invite User
      </Typography>
      <InvitationForm />
    </>
  )
}

export default Invitation
