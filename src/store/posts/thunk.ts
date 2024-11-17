import { STATE_SLICE_NAMES } from 'constants/store'
import { getUniversalsAPI } from 'api/universals/main'
import { GetUniversalsAPI, PinCmapToUniversalAPI, UnpinCmapIdFromUniversalAPI } from 'api/universals/types'
import { createAppAsyncThunk } from 'helpers/store'
import { initUniversals, pinCmapIdToUniversal, unpinCmapIdFromUniversal } from './slice'
import { CarsSlice } from './types'

export const getCarsThunk = createAppAsyncThunk<CarsSlice, GetUniversalsAPI['payload']>(
  `${STATE_SLICE_NAMES.universals}/getUniversals`,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const universalsList = await getUniversalsAPI(params)

      dispatch(initUniversals(universalsList))

      return universalsList
    } catch (e) {
      return rejectWithValue(e as Error)
    }
  }
)

export const pinCmapIdToUniversalThunk = createAppAsyncThunk<void, PinCmapToUniversalAPI['payload']>(
  `${STATE_SLICE_NAMES.universals}/pinCmapToUniversal`,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      // await pinCmapIdToUniversalAPI(params)

      dispatch(pinCmapIdToUniversal(params))
    } catch (e) {
      return rejectWithValue(e as Error)
    }
  }
)

export const unpinCmapIdFromUniversalThunk = createAppAsyncThunk<void, UnpinCmapIdFromUniversalAPI['payload']>(
  `${STATE_SLICE_NAMES.universals}/unpinCmapIdFromUniversalThunk`,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      // await unpinCmapIdFromUniversalAPI(params)

      dispatch(unpinCmapIdFromUniversal(params))
    } catch (e) {
      return rejectWithValue(e as Error)
    }
  }
)
