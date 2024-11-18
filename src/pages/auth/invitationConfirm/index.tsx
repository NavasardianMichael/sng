import { useLocation } from 'react-router-dom'
import { Flex, Typography } from 'antd'
import { ROLES } from 'helpers/constants/auth/profile'
import { PRIVATE_PAGES } from 'helpers/constants/pages'
import AppNavLink from 'components/_shared/AppNavLink/AppNavLink'

const InvitationConfirm = () => {
  const location = useLocation()
  const invitationData = location?.state?.invitationData
  const roleNames = Object.keys(ROLES) as (keyof typeof ROLES)[]

  return (
    <Flex vertical gap={1}>
      <div>
        <Typography.Title level={4}>Invitation is Sent!</Typography.Title>
        <Typography>
          You have successfully invited {invitationData.email} with a role{' '}
          {roleNames.find((key) => ROLES[key] === invitationData.role)}
        </Typography>
      </div>
      <Flex gap={2} justify="center">
        <AppNavLink primary to={PRIVATE_PAGES.home}>
          Back to Profile
        </AppNavLink>
        <AppNavLink primary to={PRIVATE_PAGES.invitation}>
          Invite more Users
        </AppNavLink>
      </Flex>
    </Flex>
  )
}

export default InvitationConfirm
