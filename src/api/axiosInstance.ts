import axios, { AxiosError } from 'axios'
import { PUBLIC_PAGES } from 'constants/pages'


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
  headers: {
  },
})

const onRejected = (error: AxiosError): Promise<AxiosError> => {
  if (error.status === 401) {
    window.location.href = PUBLIC_PAGES.login
  }
  return Promise.reject(error)
}

axiosInstance.interceptors.response.use(null, onRejected)

export default axiosInstance
