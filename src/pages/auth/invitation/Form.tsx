import { FC } from 'react'
import { Button, Flex, Input, Select } from 'antd'
import { useFormik } from 'formik'
import { selectIsProfileSlicePending } from 'store/profile/selectors'
import { useInvite } from 'hooks/auth/useInvite'
import { useAppSelector } from 'hooks/useAppSelector'
import { INVITATION_FORM_INITIAL_VALUES, INVITATION_FORM_VALIDATION_SCHEMA } from 'helpers/constants/auth/invitation'
import { ROLES } from 'helpers/constants/auth/profile'
import { PRIVATE_PAGES } from 'helpers/constants/pages'
import AppNavLink from 'components/_shared/AppNavLink/AppNavLink'
import FormItemError from 'components/_shared/FormItemError/FormItemError'

export const InvitationForm: FC = () => {
  const isPending = useAppSelector(selectIsProfileSlicePending)
  const invite = useInvite()

  const formik = useFormik({
    initialValues: INVITATION_FORM_INITIAL_VALUES,
    validationSchema: INVITATION_FORM_VALIDATION_SCHEMA,
    onSubmit: invite,
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
        <Select
          value={formik.values.role}
          onChange={formik.handleChange}
          options={Object.values(ROLES).map((role) => ({ value: role, label: role }))}
        />
        <div>
          <AppNavLink primary to={PRIVATE_PAGES.home}>
            Back to Profile
          </AppNavLink>
        </div>
        <Button htmlType="submit" disabled={isPending}>
          Invite
        </Button>
      </Flex>
    </form>
  )
}
