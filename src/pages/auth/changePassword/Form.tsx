import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Flex, Input } from 'antd'
import { useFormik } from 'formik'
import { selectIsLoggedIn, selectIsProfileSlicePending } from 'store/profile/selectors'
import { useChangePassword } from 'hooks/auth/useChangePassword'
import { useAppSelector } from 'hooks/useAppSelector'
import {
  CHANGE_PASSWORD_FORM_INITIAL_VALUES,
  CHANGE_PASSWORD_FORM_TEMPLATE,
  CHANGE_PASSWORD_FORM_VALIDATION_SCHEMA,
} from 'helpers/constants/auth/changePassword'
import { PRIVATE_PAGES } from 'helpers/constants/pages'
import AppNavLink from 'components/_shared/AppNavLink/AppNavLink'
import FormItemError from 'components/_shared/FormItemError/FormItemError'

export const ChangePasswordForm: FC = () => {
  const isPending = useAppSelector(selectIsProfileSlicePending)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const location = useLocation()
  const isFromProfile = location?.state?.origin === PRIVATE_PAGES.home
  const changePassword = useChangePassword()

  const formik = useFormik({
    initialValues: CHANGE_PASSWORD_FORM_INITIAL_VALUES,
    validationSchema: CHANGE_PASSWORD_FORM_VALIDATION_SCHEMA,
    onSubmit: changePassword,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex vertical gap={2}>
        {CHANGE_PASSWORD_FORM_TEMPLATE.map((field) => {
          const { name, placeholder } = field
          if (field.name === 'currentPassword' && (!isFromProfile || !isLoggedIn)) return null
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
