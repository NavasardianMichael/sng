import { configureStore } from '@reduxjs/toolkit'
import carsReducer from './posts/slice'
import { STATE_SLICE_NAMES } from '../constants/store'

export const store = configureStore({
  reducer: {
    [STATE_SLICE_NAMES.cars]: carsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
