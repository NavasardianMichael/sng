import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { STATE_SLICE_NAMES } from 'constants/store'
import { CarsSlice, UniversalsActionPayloads } from './types'

const initialState: CarsSlice = {
  list: {
    byId: {
      carguid: {
        id: 'carguid',
        model: 'petros',
        year: 2000,
      },
      carguid2: {
        id: 12,
        model: 'petros',
        year: 2000,
      },
    },
    allIds: ['carguid', 'carguid2'],
  },
  selectedCarId: '',
}

export const { reducer: universalsReducer, actions } = createSlice({
  name: STATE_SLICE_NAMES.universals,
  initialState,
  reducers: {
    initCars: (state, { payload }: PayloadAction<UniversalsActionPayloads['initUniversals']>) => {
      return {
        ...state,
        ...payload,
      }
    },
    removeCar: (state, { payload }: PayloadAction<UniversalsActionPayloads['removeCar']>) => {
      delete state.list.byId[payload]
    },
  },
})

export const { initUniversals, pinCmapIdToUniversal, unpinCmapIdFromUniversal } = actions

export default universalsReducer
