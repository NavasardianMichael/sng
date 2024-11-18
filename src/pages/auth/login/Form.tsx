import { FC } from 'react'
import { Button, Flex, Input } from 'antd'
import { useFormik } from 'formik'
import { selectIsProfileSlicePending } from 'store/profile/selectors'
import { useLogin } from 'hooks/auth/useLogin'
import { useAppSelector } from 'hooks/useAppSelector'
import { LOGIN_FORM_INITIAL_VALUES, LOGIN_FORM_VALIDATION_SCHEMA } from 'helpers/constants/auth/login'
import { PUBLIC_PAGES } from 'helpers/constants/pages'
import AppNavLink from 'components/_shared/AppNavLink/AppNavLink'
import FormItemError from 'components/_shared/FormItemError/FormItemError'

export const LoginForm: FC = () => {
  const isPending = useAppSelector(selectIsProfileSlicePending)
  const login = useLogin()

  const formik = useFormik({
    initialValues: LOGIN_FORM_INITIAL_VALUES,
    validationSchema: LOGIN_FORM_VALIDATION_SCHEMA,
    onSubmit: login,
    enableReinitialize: true,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex vertical gap={2}>
        <Input
          name="email"
          placeholder="Enter Email"
          disabled={isPending}
          status={formik.errors.email ? 'error' : ''}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <FormItemError key="email" message={formik.errors.email} />
        <Input
          type="password"
          name="password"
          placeholder="Enter Password"
          disabled={isPending}
          value={formik.values.password}
          onChange={formik.handleChange}
          status={formik.errors.password ? 'error' : ''}
        />
        <FormItemError key="password" message={formik.errors.password} />

        <div style={{ marginLeft: 'auto' }}>
          <AppNavLink to={PUBLIC_PAGES.forgotPassword} disabled={isPending}>
            Forgot Password
          </AppNavLink>
        </div>
        <Button htmlType="submit" disabled={isPending}>
          Login
        </Button>
      </Flex>
    </form>
  )
}
