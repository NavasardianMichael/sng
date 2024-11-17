import { FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { selectIsPending, selectProfileData } from 'store/selectors'
import { useLogout } from 'hooks/auth/useLogout'
import { useAppSelector } from 'hooks/useAppSelector'
import { PRIVATE_PAGES, PUBLIC_PAGES } from 'constants/pages'
import { ROLES } from 'constants/profile'
import AppNavLink from 'components/ui/appNavLink'

const HomePage: FC = () => {
  const { email, role } = useAppSelector(selectProfileData)
  const isPending = useAppSelector(selectIsPending)

  const handleLogoutClick = useLogout()

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={1}>
      <Typography align="center" variant="h4">
        Welcome
      </Typography>
      <Typography paragraph>{email}</Typography>
      {role === ROLES.admin && (
        <AppNavLink primary to={PRIVATE_PAGES.invitation}>
          Invite
        </AppNavLink>
      )}
      <Box marginBottom={3}>
        <AppNavLink
          primary
          to={PUBLIC_PAGES.changePassword}
          state={{ origin: PRIVATE_PAGES.home }}
          disabled={isPending}
        >
          Change Password
        </AppNavLink>
      </Box>
      <Button variant="contained" onClick={handleLogoutClick} disabled={isPending}>
        Log out
      </Button>
    </Box>
  )
}

export default HomePage
