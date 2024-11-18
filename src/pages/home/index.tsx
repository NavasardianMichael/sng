import { FC } from 'react'
import { Button, Flex, Typography } from 'antd'
import { ROLES } from 'constants/auth/profile'
import { PRIVATE_PAGES, PUBLIC_PAGES } from 'constants/pages'
import { selectIsProfileSlicePending, selectProfileData } from 'store/profile/selectors'
import { useLogout } from 'hooks/auth/useLogout'
import { useAppSelector } from 'hooks/useAppSelector'
import AppNavLink from 'components/_shared/AppNavLink/AppNavLink'

const HomePage: FC = () => {
  const { email, role } = useAppSelector(selectProfileData)
  const isPending = useAppSelector(selectIsProfileSlicePending)

  const handleLogoutClick = useLogout()

  return (
    <Flex vertical justify="center" gap={1}>
      <Typography.Title level={4}>Welcome</Typography.Title>
      <Typography.Paragraph>{email}</Typography.Paragraph>
      {role === ROLES.admin && (
        <AppNavLink primary to={PRIVATE_PAGES.invitation}>
          Invite
        </AppNavLink>
      )}
      <div style={{ marginBottom: 3 }}>
        <AppNavLink
          primary
          to={PUBLIC_PAGES.changePassword}
          state={{ origin: PRIVATE_PAGES.home }}
          disabled={isPending}
        >
          Change Password
        </AppNavLink>
      </div>
      <Button onClick={handleLogoutClick} disabled={isPending}>
        Log out
      </Button>
    </Flex>
  )
}

export default HomePage
