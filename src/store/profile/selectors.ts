import { RootState } from './main'

export const selectProfileData = (state: RootState) => state.data
export const selectIsLoggedIn = (state: RootState) => state.isLoggedIn
export const selectIsPending = (state: RootState) => state.isPending
export const selectErrorMessage = (state: RootState) => state.errorMessage
