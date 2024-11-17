import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import { Box, Button, TextField } from '@mui/material'
import { selectIsLoggedIn, selectIsPending } from 'store/selectors'
import { useChangePassword } from 'hooks/auth/useChangePassword'
import { useAppSelector } from 'hooks/useAppSelector'
import {
  CHANGE_PASSWORD_FORM_INITIAL_VALUES,
  CHANGE_PASSWORD_FORM_TEMPLATE,
  CHANGE_PASSWORD_FORM_VALIDATION_SCHEMA,
} from 'constants/auth/changePassword'
import { PRIVATE_PAGES } from 'constants/pages'
import AppNavLink from 'components/ui/appNavLink'

export const ChangePasswordForm: FC = () => {
  const isPending = useAppSelector(selectIsPending)
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
      <Box display="flex" flexDirection="column" gap={2}>
        {CHANGE_PASSWORD_FORM_TEMPLATE.map((field) => {
          const { name, placeholder } = field
          if (field.name === 'currentPassword' && (!isFromProfile || !isLoggedIn)) return null
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
