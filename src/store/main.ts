import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './posts/slice'
import { STATE_SLICE_NAMES } from '../constants/store'

export const store = configureStore({
  reducer: {
    [STATE_SLICE_NAMES.posts]: profileReducer,
    [STATE_SLICE_NAMES.profile]: profileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
