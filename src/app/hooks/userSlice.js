import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_MILES_PER_DAY_WEEKDAY, DEFAULT_ICE_RANGE } from '../globals';
import { CAR_DATA } from '../globals';

export const userSlice = createSlice({
    name: 'inputs',
    initialState: {
        milesDriven: DEFAULT_MILES_PER_DAY_WEEKDAY,
        car_driven: null,
        average_ice_range: DEFAULT_ICE_RANGE,
        dataEntered: false,
    },
    reducers: {
        updateMilesDriven: ( state, action ) => {
            state.milesDriven = action.payload;
        },
        updateCarDriven: ( state, action ) => {
            state.car_driven = action.payload;
            state.average_ice_range = CAR_DATA.find( (car) => action.payload === car.id ).average_range;
        },
        updateDataEntered: ( state, action ) => {
            state.dataEntered = action.payload;
        }
    }
})

export const { updateMilesDriven, updateCarDriven, updateDataEntered } = userSlice.actions;

export default userSlice.reducer;