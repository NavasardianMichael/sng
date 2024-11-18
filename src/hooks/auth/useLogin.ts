import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginAPI } from 'api/auth/types'
import { getProfileThunk, loginThunk } from 'store/profile/thunk'
import { PRIVATE_PAGES } from 'helpers/constants/pages'
import { isRejectedAction } from 'helpers/functions/store'
import { useAppDispatch } from '../useAppDispatch'
import useLocalStorage from '../useLocalStorage'

export const useLogin = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [, setIsLoggedIn] = useLocalStorage('isLoggedIn', false)

  return useCallback(
    async (values: LoginAPI['payload']) => {
      const loginAction = await dispatch(loginThunk(values))
      if (isRejectedAction(loginAction)) return

      const getProfileAction = await dispatch(getProfileThunk())
      if (isRejectedAction(getProfileAction)) return

      setIsLoggedIn(true)
      navigate(PRIVATE_PAGES.home)
    },
    [dispatch, navigate, setIsLoggedIn]
  )
}
