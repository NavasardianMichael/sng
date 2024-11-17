import { Box, Typography } from '@mui/material'

const EmailVerification = () => {
  return (
    <Box textAlign="center">
      <Typography align="center" variant="h4" gutterBottom>
        Follow the Instructions in the Email.
      </Typography>
      <Typography>
        We've sent a confirmation email to the address you provided. Please check your inbox to confirm your email
        address and complete the process.
      </Typography>
    </Box>
  )
}

export default EmailVerification
