import { FC } from 'react'
import { useFormik } from 'formik'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { selectIsPending } from 'store/selectors'
import { useInvite } from 'hooks/auth/useInvite'
import { useAppSelector } from 'hooks/useAppSelector'
import { INVITATION_FORM_INITIAL_VALUES, INVITATION_FORM_VALIDATION_SCHEMA } from 'constants/auth/invitation'
import { PRIVATE_PAGES } from 'constants/pages'
import { ROLES } from 'constants/profile'
import AppNavLink from 'components/ui/appNavLink'

export const InvitationForm: FC = () => {
  const isPending = useAppSelector(selectIsPending)
  const invite = useInvite()

  const formik = useFormik({
    initialValues: INVITATION_FORM_INITIAL_VALUES,
    validationSchema: INVITATION_FORM_VALIDATION_SCHEMA,
    onSubmit: invite,
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
        <FormControl fullWidth>
          <InputLabel id="role-select">Role</InputLabel>
          <Select
            labelId="role-select"
            name="role"
            value={formik.values.role}
            label="Role"
            onChange={formik.handleChange}
          >
            {(Object.keys(ROLES) as (keyof typeof ROLES)[]).map((role) => {
              const value = ROLES[role]
              return (
                <MenuItem key={role} value={value}>
                  {role}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <Box>
          <AppNavLink primary to={PRIVATE_PAGES.home}>
            Back to Profile
          </AppNavLink>
        </Box>
        <Button type="submit" variant="contained" disabled={isPending}>
          Invite
        </Button>
      </Box>
    </form>
  )
}
