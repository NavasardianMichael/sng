import { FC } from 'react'
import { Button, Flex, Input } from 'antd'
import {
  FORGOT_PASSWORD_FORM_INITIAL_VALUES,
  FORGOT_PASSWORD_FORM_VALIDATION_SCHEMA,
} from 'constants/auth/forgotPassword'
import { PUBLIC_PAGES } from 'constants/pages'
import { useFormik } from 'formik'
import { selectIsLoggedIn, selectIsProfileSlicePending } from 'store/profile/selectors'
import { useForgotPassword } from 'hooks/auth/useForgotPassword'
import { useAppSelector } from 'hooks/useAppSelector'
import AppNavLink from 'components/_shared/AppNavLink/AppNavLink'
import FormItemError from 'components/_shared/FormItemError/FormItemError'

export const ForgotPasswordForm: FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const isPending = useAppSelector(selectIsProfileSlicePending)
  const forgotPassword = useForgotPassword()

  const formik = useFormik({
    initialValues: FORGOT_PASSWORD_FORM_INITIAL_VALUES,
    validationSchema: FORGOT_PASSWORD_FORM_VALIDATION_SCHEMA,
    onSubmit: forgotPassword,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex vertical gap={2}>
        <Input
          name="email"
          placeholder="Enter Email"
          disabled={isPending}
          value={formik.values.email}
          onChange={formik.handleChange}
          status={formik.errors.email ? 'error' : ''}
        />
        <FormItemError key="email" message={formik.errors.email} />
        <Flex>
          <AppNavLink primary to={PUBLIC_PAGES.login} disabled={isPending}>
            {isLoggedIn ? 'Profile' : 'Login'}
          </AppNavLink>
        </Flex>
        <Button htmlType="submit" disabled={isPending}>
          Send Email
        </Button>
      </Flex>
    </form>
  )
}
