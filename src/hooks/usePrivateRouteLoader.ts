import { useCallback } from 'react'
import { defer } from 'react-router-dom'
import { getProfileThunk } from 'store/profile/thunk'
import { isRejectedAction } from 'helpers/functions/store'
import { useAppDispatch } from './useAppDispatch'
import useLocalStorage from './useLocalStorage'

export const usePrivateRouteLoader = () => {
  const dispatch = useAppDispatch()
  const [isLoggedIn] = useLocalStorage('isLoggedIn', false)

  return useCallback(async () => {
    if (isLoggedIn) {
      const getProfileAction = await dispatch(getProfileThunk())

      if (isRejectedAction(getProfileAction)) return false
      return defer(getProfileAction)
    }

    return null
  }, [dispatch, isLoggedIn])
}
