import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { forgotPasswordThunk } from 'store/thunk'
import { Profile } from 'store/types'
import { PUBLIC_PAGES } from 'constants/pages'
import { isRejectedAction } from 'utils/store'
import { useAppDispatch } from '../useAppDispatch'

export const useForgotPassword = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return useCallback(
    async (values: Pick<Profile, 'email'>) => {
      const res = await dispatch(forgotPasswordThunk(values.email))
      if (isRejectedAction(res)) return

      navigate(PUBLIC_PAGES.emailVerification)
    },
    [dispatch, navigate]
  )
}
