import { Typography } from 'antd'
import { PRIVATE_PAGES } from 'constants/pages'
import { selectIsLoggedIn, selectIsProfileSlicePending } from 'store/profile/selectors'
import { useAppSelector } from 'hooks/useAppSelector'
import AppNavLink from 'components/_shared/AppNavLink/AppNavLink'

const Confirmation = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const isPending = useAppSelector(selectIsProfileSlicePending)

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography.Title level={4}>Your action is succeed!</Typography.Title>
      <Typography.Paragraph>
        Back to{' '}
        {
          <AppNavLink to={PRIVATE_PAGES.home} disabled={isPending}>
            {isLoggedIn ? 'Profile' : 'Login'}
          </AppNavLink>
        }
      </Typography.Paragraph>
    </div>
  )
}

export default Confirmation
