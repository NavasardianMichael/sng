import { FC } from 'react'
import { Button, Flex, Input } from 'antd'
import {
  RESET_PASSWORD_FORM_INITIAL_VALUES,
  RESET_PASSWORD_FORM_TEMPLATE,
  RESET_PASSWORD_FORM_VALIDATION_SCHEMA,
} from 'constants/auth/resetPassword'
import { PRIVATE_PAGES } from 'constants/pages'
import { useFormik } from 'formik'
import { selectIsLoggedIn, selectIsProfileSlicePending } from 'store/profile/selectors'
import { useResetPassword } from 'hooks/auth/useResetPassword'
import { useAppSelector } from 'hooks/useAppSelector'
import AppNavLink from 'components/_shared/AppNavLink/AppNavLink'
import FormItemError from 'components/_shared/FormItemError/FormItemError'

export const ResetPasswordForm: FC = () => {
  const isPending = useAppSelector(selectIsProfileSlicePending)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const resetPassword = useResetPassword()

  const formik = useFormik({
    initialValues: RESET_PASSWORD_FORM_INITIAL_VALUES,
    validationSchema: RESET_PASSWORD_FORM_VALIDATION_SCHEMA,
    onSubmit: resetPassword,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex vertical gap={2}>
        {RESET_PASSWORD_FORM_TEMPLATE.map((field) => {
          const { name, placeholder } = field
          return (
            <div>
              <Input
                key={name}
                type="password"
                name={name}
                placeholder={placeholder}
                disabled={isPending}
                value={formik.values[name]}
                onChange={formik.handleChange}
                status={formik.errors[name] ? 'error' : ''}
              />
              <FormItemError message={formik.errors[name]} />
            </div>
          )
        })}
        <Flex justify="space-between">
          <AppNavLink to={PRIVATE_PAGES.home} disabled={isPending}>
            {isLoggedIn ? 'Profile' : 'Login'}
          </AppNavLink>
        </Flex>
        <Button htmlType="submit" disabled={isPending}>
          Confirm
        </Button>
      </Flex>
    </form>
  )
}
