import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { STATE_SLICE_NAMES } from 'helpers/constants/store'
import { MiniEntitiesSlice, PostsActionPayloads } from './types'

const initialState: MiniEntitiesSlice = {
  availabilityStates: [],
  bodyTypes: [],
  categories: [],
  documentTypes: [],
  engines: [],
  ownerNumbers: [],
  priceUnits: [],
  transmissions: [],
}

export const { reducer: miniEntitiesReducer, actions } = createSlice({
  name: STATE_SLICE_NAMES.miniEntities,
  initialState,
  reducers: {
    initMiniEntities: (_, { payload }: PayloadAction<PostsActionPayloads['initMiniEntities']>) => {
      return payload
    },
  },
})

export const { initMiniEntities } = actions

export default miniEntitiesReducer
