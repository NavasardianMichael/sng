import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit'
import { PROFILE_INITIAL_DATA } from 'constants/auth/commons'
import { ProfileActionPayloads, ProfileSlice } from './types'
import { isFulfilledAction, isPendingAction, isRejectedAction } from 'helpers/store'

const initialState: ProfileSlice = {
  data: PROFILE_INITIAL_DATA,
  isLoggedIn: !!localStorage.getItem('isLoggedIn'),
  isPending: false,
  errorMessage: '',
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, { payload }: PayloadAction<ProfileActionPayloads['setProfileData']>) => {
      state.data = {
        ...state.data,
        ...payload,
      }
    },
    setIsLoggedIn: (state, { payload }: PayloadAction<ProfileActionPayloads['setIsLoggedIn']>) => {
      state.isLoggedIn = payload
    },
    resetErrorMessage: (state) => {
      state.errorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isRejectedAction, (state, action: PayloadAction<SerializedError>) => {
        state.isPending = false

        state.errorMessage = action.payload.message ?? 'Rejected Action.'
      })
      .addMatcher(isPendingAction, (state) => {
        state.isPending = true
      })
      .addMatcher(isFulfilledAction, (state) => {
        state.isPending = false
      })
  },
})

export const { setProfileData, setIsLoggedIn, resetErrorMessage } = profileSlice.actions

export default profileSlice.reducer
