import { FC, useEffect } from 'react'
import { Button, Flex, Input, Typography } from 'antd'
import { useFormik } from 'formik'
import { selectErrorMessage, selectIsProfileSlicePending } from 'store/profile/selectors'
import { useRegister } from 'hooks/auth/useRegister'
import { useVerifyToken } from 'hooks/auth/useVerifyToken'
import { useAppSelector } from 'hooks/useAppSelector'
import {
  REGISTRATION_FORM_INITIAL_VALUES,
  REGISTRATION_FORM_TEMPLATE,
  REGISTRATION_FORM_VALIDATION_SCHEMA,
} from 'helpers/constants/auth/registration'
import { PUBLIC_PAGES } from 'helpers/constants/pages'
import AppNavLink from 'components/_shared/AppNavLink/AppNavLink'
import FormItemError from 'components/_shared/FormItemError/FormItemError'

export const RegistrationForm: FC = () => {
  const isPending = useAppSelector(selectIsProfileSlicePending)
  const errorMessage = useAppSelector(selectErrorMessage)
  const register = useRegister()
  const verifyToken = useVerifyToken()

  const formik = useFormik({
    initialValues: REGISTRATION_FORM_INITIAL_VALUES,
    validationSchema: REGISTRATION_FORM_VALIDATION_SCHEMA,
    onSubmit: register,
  })

  useEffect(() => {
    verifyToken()
  }, [verifyToken])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex vertical gap={2}>
        {REGISTRATION_FORM_TEMPLATE.map((field) => {
          const { name, type, placeholder } = field
          return (
            <div key={name}>
              <Input
                type={type}
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
        <Typography.Text>
          Already have an account? <AppNavLink to={PUBLIC_PAGES.login}>Login</AppNavLink>
        </Typography.Text>
        <Button htmlType="submit" disabled={isPending || !!errorMessage}>
          Register
        </Button>
      </Flex>
    </form>
  )
}
