import axios, { AxiosError } from 'axios'
import authService from 'services/auth'
import { checkIsReadOnlyMode } from 'helpers/app'
import { getURLSearchParamValue } from 'helpers/urlSearchParams'

const baseURL = checkIsReadOnlyMode() ? import.meta.env.VITE_APP_READ_ONLY_API_URL : import.meta.env.VITE_APP_API_URL
const tokenPrefix = checkIsReadOnlyMode() ? 'Basic ' : 'Bearer '

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'If-Modified-Since': 0,
    Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
    Pragma: 'no-cache',
    Authorization:
      tokenPrefix +
      // There are two ways the application might be opened
      // 1. Read-only mode, when accessToken must be provided in URL as a query parameter
      // 2. user mode, when accessToken must be provided from a login flow of OIDC
      (checkIsReadOnlyMode() ? getURLSearchParamValue('accessToken') : (await authService.getUser())?.access_token),
  },
})

const onRejected = (error: AxiosError): Promise<AxiosError> => {
  if (error.status === 401) {
    authService.signInRedirect()
  }
  return Promise.reject(error)
}

axiosInstance.interceptors.response.use(null, onRejected)

export default axiosInstance
