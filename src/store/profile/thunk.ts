import { AxiosError, isAxiosError } from 'axios'
import { PROFILE_INITIAL_DATA } from 'constants/auth/commons'
import { STATE_SLICE_NAMES } from 'constants/store'
import {
  changePasswordAPI,
  inviteUserAPI,
  loginAPI,
  logoutAPI,
  registerAPI,
  resetPasswordAPI,
  sendForgotPasswordInstructionsAPI,
  verifyTokenAPI,
} from 'api/auth/main'
import {
  ChangePasswordAPI,
  InviteUserAPI,
  LoginAPI,
  LogoutAPI,
  RegisterAPI,
  ResetPasswordAPI,
  SendForgotPasswordInstructionsAPI,
  VerifyTokenAPI,
} from 'api/auth/types'
import { createAppAsyncThunk } from 'helpers/store'
import { setIsLoggedIn, setProfileData } from './slice'
import { Profile } from './types'

export const loginThunk = createAppAsyncThunk<Profile, LoginAPI['payload']>(
  `${STATE_SLICE_NAMES.profile}/login`,
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const profile = await loginAPI(payload)
      dispatch(setIsLoggedIn(true))

      return profile
    } catch (e) {
      const error = e as Error | AxiosError
      const processedError = isAxiosError(error) ? error?.response?.data : error
      return rejectWithValue(processedError)
    }
  }
)

export const registerThunk = createAppAsyncThunk<Profile, RegisterAPI['payload']>(
  `${STATE_SLICE_NAMES.profile}/register`,
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const profile = await registerAPI(payload)
      dispatch(setProfileData(profile))
      return profile
    } catch (e) {
      const error = e as Error | AxiosError
      const processedError = isAxiosError(error) ? error?.response?.data : error
      return rejectWithValue(processedError)
    }
  }
)

export const logoutThunk = createAppAsyncThunk<void, LogoutAPI['payload']>(
  `${STATE_SLICE_NAMES.profile}/logout`,
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await logoutAPI()

      dispatch(setIsLoggedIn(false))
      dispatch(setProfileData(PROFILE_INITIAL_DATA))
    } catch (e) {
      const error = e as Error | AxiosError
      const processedError = isAxiosError(error) ? error?.response?.data : error
      return rejectWithValue(processedError)
    }
  }
)

export const forgotPasswordThunk = createAppAsyncThunk<void, SendForgotPasswordInstructionsAPI['payload']>(
  `${STATE_SLICE_NAMES.profile}/forgotPassword`,
  async (payload, { rejectWithValue }) => {
    try {
      await sendForgotPasswordInstructionsAPI(payload)
    } catch (e) {
      const error = e as Error | AxiosError
      const processedError = isAxiosError(error) ? error?.response?.data : error
      return rejectWithValue(processedError)
    }
  }
)

export const changePasswordThunk = createAppAsyncThunk<void, ChangePasswordAPI['payload']>(
  `${STATE_SLICE_NAMES.profile}/changePassword`,
  async (payload, { rejectWithValue }) => {
    try {
      await changePasswordAPI(payload)
    } catch (e) {
      const error = e as Error | AxiosError
      const processedError = isAxiosError(error) ? error?.response?.data : error
      return rejectWithValue(processedError)
    }
  }
)

export const resetPasswordThunk = createAppAsyncThunk<void, ResetPasswordAPI['payload']>(
  `${STATE_SLICE_NAMES.profile}/resetPassword`,
  async (payload, { rejectWithValue }) => {
    try {
      await resetPasswordAPI(payload)
    } catch (e) {
      const error = e as Error | AxiosError
      const processedError = isAxiosError(error) ? error?.response?.data : error
      return rejectWithValue(processedError)
    }
  }
)

export const verifyTokenThunk = createAppAsyncThunk<void, VerifyTokenAPI['payload']>(
  `${STATE_SLICE_NAMES.profile}/verifyToken`,
  async (payload, { rejectWithValue }) => {
    try {
      await verifyTokenAPI(payload)
    } catch (e) {
      const error = e as Error | AxiosError
      const processedError = isAxiosError(error) ? error?.response?.data : error
      return rejectWithValue(processedError)
    }
  }
)

export const inviteUserThunk = createAppAsyncThunk<void, InviteUserAPI['payload']>(
  `${STATE_SLICE_NAMES.profile}/inviteUser`,
  async (payload, { rejectWithValue }) => {
    try {
      await inviteUserAPI(payload)
    } catch (e) {
      const error = e as Error | AxiosError
      const processedError = isAxiosError(error) ? error?.response?.data : error
      return rejectWithValue(processedError)
    }
  }
)
