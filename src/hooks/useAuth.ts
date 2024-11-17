import { useEffect } from 'react'
import { initDataThunk } from 'store/_shared/thunks'
import { setSettings } from 'store/settings/slice'
import { getURLSearchParams } from 'helpers/urlSearchParams'
import { useAppDispatch } from './useAppDispatch'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const fetchUser = async () => {
      const { filename: fileNameFromURL } = getURLSearchParams()

      const fileNameFromLocalStorage = localStorage.getItem('filename')
      const fileName = fileNameFromURL ?? fileNameFromLocalStorage
      if (!fileNameFromLocalStorage || fileNameFromLocalStorage !== fileName) localStorage.setItem('filename', fileName)

      dispatch(
        setSettings({
          fileName,
        })
      )

      dispatch(initDataThunk({ fileName }))
    }
    fetchUser()
  }, [dispatch])
}
