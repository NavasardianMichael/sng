import axiosInstance from 'api/axiosInstance'
import { APIResponse } from 'types/api'
import { handleAPIError } from 'helpers/api'
import {
  processChangePasswordResponse,
  processIniviteUserResponse,
  processLoginResponse,
  processLogoutResponse,
  processRegisterResponse,
  processResetPasswordResponse,
  processSendForgotPasswordInstructionsResponse,
  processVerifyTokenResponse,
} from './processors'
import {
  ChangePasswordAPI,
  InviteUserAPI,
  LoginAPI,
  LogoutAPI,
  RegisterAPI,
  ResetPasswordAPI,
  SendForgotPasswordInstructionsAPI,
  VerifyTokenAPI,
} from './types'
import { ENDPOINTS } from './endpoints'

export const loginAPI: LoginAPI['api'] = async (params) => {
  const { data } = await axiosInstance.post<APIResponse<LoginAPI['response']>>(
    ENDPOINTS.login,
    JSON.stringify(params)
  )
  handleAPIError(data)
  const processedResponse = processLoginResponse(data)
  return processedResponse
}

export const registerAPI: RegisterAPI['api'] = async (params) => {
  const { data } = await axiosInstance.post<APIResponse<RegisterAPI['response']>>(
    ENDPOINTS.register,
    JSON.stringify(params)
  )
  handleAPIError(data)
  const processedResponse = processRegisterResponse(data)
  return processedResponse
}

export const logoutAPI: LogoutAPI['api'] = async (params) => {
  console.log(params);

  const { data } = await axiosInstance.post<APIResponse<LogoutAPI['response']>>(
    ENDPOINTS.logout,
    JSON.stringify(params)
  )
  handleAPIError(data)
  const processedResponse = processLogoutResponse(data)
  return processedResponse
}

export const sendForgotPasswordInstructionsAPI: SendForgotPasswordInstructionsAPI['api'] = async (params) => {
  const { data } = await axiosInstance.post<APIResponse<SendForgotPasswordInstructionsAPI['response']>>(
    ENDPOINTS.sendForgotPasswordInstructions,
    JSON.stringify(params)
  )
  handleAPIError(data)
  const processedResponse = processSendForgotPasswordInstructionsResponse(data)
  return processedResponse
}

export const changePasswordAPI: ChangePasswordAPI['api'] = async (params) => {
  const { data } = await axiosInstance.post<APIResponse<ChangePasswordAPI['response']>>(
    ENDPOINTS.changePassword,
    JSON.stringify(params)
  )
  handleAPIError(data)
  const processedResponse = processChangePasswordResponse(data)
  return processedResponse
}

export const inviteUserAPI: InviteUserAPI['api'] = async (params) => {
  const { data } = await axiosInstance.post<APIResponse<InviteUserAPI['response']>>(
    ENDPOINTS.inviteUser,
    JSON.stringify(params)
  )
  handleAPIError(data)
  const processedResponse = processIniviteUserResponse(data)
  return processedResponse
}

export const verifyTokenAPI: VerifyTokenAPI['api'] = async (params) => {
  const { data } = await axiosInstance.post<APIResponse<VerifyTokenAPI['response']>>(
    ENDPOINTS.verifyToken,
    JSON.stringify(params)
  )
  handleAPIError(data)
  const processedResponse = processVerifyTokenResponse(data)
  return processedResponse
}

export const resetPasswordAPI: ResetPasswordAPI['api'] = async (params) => {
  const { data } = await axiosInstance.post<APIResponse<ResetPasswordAPI['response']>>(
    ENDPOINTS.resetPassword,
    JSON.stringify(params)
  )
  handleAPIError(data)
  const processedResponse = processResetPasswordResponse(data)
  return processedResponse
}