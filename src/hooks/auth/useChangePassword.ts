import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { changePasswordThunk } from 'store/thunk'
import { CHANGE_PASSWORD_FORM_INITIAL_VALUES } from 'constants/auth/changePassword'
import { PUBLIC_PAGES } from 'constants/pages'
import { isRejectedAction } from 'utils/store'
import { useAppDispatch } from '../useAppDispatch'

export const useChangePassword = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return useCallback(
    async (values: typeof CHANGE_PASSWORD_FORM_INITIAL_VALUES) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      const res = await dispatch(changePasswordThunk(values))
      if (isRejectedAction(res)) return

      navigate(PUBLIC_PAGES.confirmation)
    },
    [dispatch, navigate]
  )
}
