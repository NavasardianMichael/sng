import { FC } from 'react'
import { useFormik } from 'formik'
import { Box, Button, TextField } from '@mui/material'
import { selectIsPending } from 'store/selectors'
import { useLogin } from 'hooks/auth/useLogin'
import { useAppSelector } from 'hooks/useAppSelector'
import { LOGIN_FORM_INITIAL_VALUES, LOGIN_FORM_VALIDATION_SCHEMA } from 'constants/auth/login'
import { PUBLIC_PAGES } from 'constants/pages'
import AppNavLink from 'components/ui/appNavLink'

export const LoginForm: FC = () => {
  const isPending = useAppSelector(selectIsPending)
  const login = useLogin()

  const formik = useFormik({
    initialValues: LOGIN_FORM_INITIAL_VALUES,
    validationSchema: LOGIN_FORM_VALIDATION_SCHEMA,
    onSubmit: login,
    enableReinitialize: true,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          name="email"
          placeholder="Enter Email"
          disabled={isPending}
          error={!!formik.errors.email}
          helperText={formik.errors.email}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <TextField
          type="password"
          name="password"
          placeholder="Enter Password"
          disabled={isPending}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={!!formik.errors.password}
          helperText={formik.errors.password}
        />
        <Box marginLeft="auto">
          <AppNavLink primary to={PUBLIC_PAGES.forgotPassword} disabled={isPending}>
            Forgot Password
          </AppNavLink>
        </Box>
        <Button type="submit" variant="contained" disabled={isPending}>
          Login
        </Button>
      </Box>
    </form>
  )
}
