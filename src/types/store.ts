import { SerializedError } from '@reduxjs/toolkit'
import { ENDPOINTS } from 'constants/api'
import { STATE_SLICE_NAMES } from 'constants/store'
import { AppDispatch, RootState } from 'store/main'

export type ThunkConfig = {
  state: RootState
  dispatch: AppDispatch
  rejectValue: SerializedError
}

export type StateSliceName = (typeof STATE_SLICE_NAMES)[keyof typeof STATE_SLICE_NAMES]

export type Endpoints = (typeof ENDPOINTS)[keyof typeof ENDPOINTS]
