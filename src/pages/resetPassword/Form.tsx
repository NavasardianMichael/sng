import { FC } from 'react'
import { useFormik } from 'formik'
import { Box, Button, TextField } from '@mui/material'
import { selectIsLoggedIn, selectIsPending } from 'store/selectors'
import { useResetPassword } from 'hooks/auth/useResetPassword'
import { useAppSelector } from 'hooks/useAppSelector'
import {
  RESET_PASSWORD_FORM_INITIAL_VALUES,
  RESET_PASSWORD_FORM_TEMPLATE,
  RESET_PASSWORD_FORM_VALIDATION_SCHEMA,
} from 'constants/auth/resetPassword'
import { PRIVATE_PAGES } from 'constants/pages'
import AppNavLink from 'components/ui/appNavLink'

export const ResetPasswordForm: FC = () => {
  const isPending = useAppSelector(selectIsPending)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const resetPassword = useResetPassword()

  const formik = useFormik({
    initialValues: RESET_PASSWORD_FORM_INITIAL_VALUES,
    validationSchema: RESET_PASSWORD_FORM_VALIDATION_SCHEMA,
    onSubmit: resetPassword,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        {RESET_PASSWORD_FORM_TEMPLATE.map((field) => {
          const { name, placeholder } = field
          return (
            <TextField
              key={name}
              type="password"
              name={name}
              placeholder={placeholder}
              disabled={isPending}
              value={formik.values[name]}
              onChange={formik.handleChange}
              error={!!formik.errors[name]}
              helperText={formik.errors[name]}
            />
          )
        })}
        <Box display="flex" justifyContent="space-between">
          <AppNavLink primary to={PRIVATE_PAGES.home} disabled={isPending}>
            {isLoggedIn ? 'Profile' : 'Login'}
          </AppNavLink>
        </Box>
        <Button type="submit" variant="contained" disabled={isPending}>
          Confirm
        </Button>
      </Box>
    </form>
  )
}
