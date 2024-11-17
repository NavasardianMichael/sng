import { FC } from 'react'
import { useFormik } from 'formik'
import { Box, Button, TextField } from '@mui/material'
import { selectIsLoggedIn, selectIsPending } from 'store/selectors'
import { useForgotPassword } from 'hooks/auth/useForgotPassword'
import { useAppSelector } from 'hooks/useAppSelector'
import {
  FORGOT_PASSWORD_FORM_INITIAL_VALUES,
  FORGOT_PASSWORD_FORM_VALIDATION_SCHEMA,
} from 'constants/auth/forgotPassword'
import { PUBLIC_PAGES } from 'constants/pages'
import AppNavLink from 'components/ui/appNavLink'

export const ForgotPasswordForm: FC = () => {
  const isPending = useAppSelector(selectIsPending)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const forgotPassword = useForgotPassword()

  const formik = useFormik({
    initialValues: FORGOT_PASSWORD_FORM_INITIAL_VALUES,
    validationSchema: FORGOT_PASSWORD_FORM_VALIDATION_SCHEMA,
    onSubmit: forgotPassword,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          name="email"
          placeholder="Enter Email"
          disabled={isPending}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={!!formik.errors.email}
          helperText={formik.errors.email}
        />
        <Box display="flex">
          <AppNavLink primary to={PUBLIC_PAGES.login} disabled={isPending}>
            {isLoggedIn ? 'Profile' : 'Login'}
          </AppNavLink>
        </Box>
        <Button type="submit" variant="contained" disabled={isPending}>
          Send Email
        </Button>
      </Box>
    </form>
  )
}
