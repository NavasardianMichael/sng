import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfileThunk, loginThunk } from 'store/thunk'
import { LoginFormValues } from 'types/auth'
import { PRIVATE_PAGES } from 'constants/pages'
import { isRejectedAction } from 'utils/store'
import { useAppDispatch } from '../useAppDispatch'
import useLocalStorage from '../useLocalStorage'

export const useLogin = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [, setIsLoggedIn] = useLocalStorage('isLoggedIn', false)

  return useCallback(
    async (values: LoginFormValues) => {
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
