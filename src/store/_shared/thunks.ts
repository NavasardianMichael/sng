import { GetMaxiomsAPI } from 'api/maxioms/types'
import { setAppOptions } from 'store/app/slice'
import { getMaxiomsThunk } from 'store/maxiom/thunk'
import { getUniversalsThunk } from 'store/posts/thunk'
import { createAppAsyncThunk } from 'helpers/store'

export const initDataThunk = createAppAsyncThunk<void, GetMaxiomsAPI['payload']>(
  `initDataThunk`,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setAppOptions({ isPending: true }))

      await Promise.all([dispatch(getUniversalsThunk(params)), dispatch(getMaxiomsThunk(params))])
      dispatch(setAppOptions({ isPending: false }))
    } catch (e) {
      return rejectWithValue(e as Error)
    }
  }
)
