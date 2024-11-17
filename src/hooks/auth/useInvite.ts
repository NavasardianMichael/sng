import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { inviteThunk } from 'store/thunk'
import { Profile } from 'store/types'
import { PRIVATE_PAGES } from 'constants/pages'
import { isRejectedAction } from 'utils/store'
import { useAppDispatch } from '../useAppDispatch'

export const useInvite = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return useCallback(
    async (values: Pick<Profile, 'email' | 'role'>) => {
      const res = await dispatch(inviteThunk(values))

      if (isRejectedAction(res)) return

      navigate(PRIVATE_PAGES.invitationConfirm, {
        state: {
          invitationData: values,
        },
      })
    },
    [dispatch, navigate]
  )
}
