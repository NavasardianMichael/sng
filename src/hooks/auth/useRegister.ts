import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerThunk } from 'store/profile/thunk'
import { Role } from 'store/profile/types'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useQueryParams } from 'hooks/useQueryParams'
import { REGISTRATION_FORM_INITIAL_VALUES } from 'helpers/constants/auth/registration'
import { PUBLIC_PAGES } from 'helpers/constants/pages'
import { isRejectedAction } from 'helpers/functions/store'

export const useRegister = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const queryParams = useQueryParams()

  const email = queryParams.email
  const token = queryParams.token.replace(/ /gi, '+')
  const role = +queryParams.role as Role

  return useCallback(
    async (values: typeof REGISTRATION_FORM_INITIAL_VALUES) => {
      const { password, confirmedPassword } = values

      const res = await dispatch(
        registerThunk({
          password,
          confirmedPassword,
          email,
          phone: '',
          token,
          role,
        })
      )

      if (isRejectedAction(res)) return

      navigate(PUBLIC_PAGES.confirmation)
    },
    [dispatch, navigate, email, token]
  )
}
