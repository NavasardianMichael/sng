import { Box, Typography } from '@mui/material'
import { selectIsLoggedIn, selectIsPending } from 'store/selectors'
import { useAppSelector } from 'hooks/useAppSelector'
import { PRIVATE_PAGES } from 'constants/pages'
import AppNavLink from 'components/ui/appNavLink'

const Confirmation = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const isPending = useAppSelector(selectIsPending)

  return (
    <Box textAlign="center">
      <Typography align="center" variant="h4" gutterBottom>
        Your action is succeed!
      </Typography>
      <Typography>
        Back to{' '}
        {
          <AppNavLink primary to={PRIVATE_PAGES.home} disabled={isPending}>
            {isLoggedIn ? 'Profile' : 'Login'}
          </AppNavLink>
        }
      </Typography>
    </Box>
  )
}

export default Confirmation
