import { RootState } from 'store/main'

export const selectCars = (state: RootState) => state.cars.list
