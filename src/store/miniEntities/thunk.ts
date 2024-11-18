import { getMiniEntitiesAPI } from 'api/miniEntities/main'
import { GetMiniEntitiesAPI } from 'api/miniEntities/types'
import { STATE_SLICE_NAMES } from 'helpers/constants/store'
import { createAppAsyncThunk } from 'helpers/functions/store'
import { initMiniEntities } from './slice'
import { MiniEntitiesSlice } from './types'

export const getMiniEntitiesThunk = createAppAsyncThunk<MiniEntitiesSlice, GetMiniEntitiesAPI['payload']>(
  `${STATE_SLICE_NAMES.miniEntities}/getMiniEntities`,
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const miniEntities = await getMiniEntitiesAPI()
      dispatch(initMiniEntities(miniEntities))
      return miniEntities
    } catch (e) {
      return rejectWithValue(e as Error)
    }
  }
)
