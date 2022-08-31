import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_MILES_PER_DAY_WEEKDAY, DEFAULT_ICE_RANGE } from '../globals';
import { CAR_DATA } from '../globals';

export const userSlice = createSlice({
    name: 'inputs',
    initialState: {
        milesDriven: DEFAULT_MILES_PER_DAY_WEEKDAY,
        carDriven: null,
        averageIceRange: DEFAULT_ICE_RANGE,
        dataEntered: false,
    },
    reducers: {
        car: ( state, action ) => {
            switch( action.type ) {
                case 'UPDATE_CAR':
                    state.carDriven = action.payload;
                case 'UPDATE_MILES_DRIVEN':
                    state.milesDriven = action.payload;
            }
        },
        updateMilesDriven: ( state, action ) => {
            state.milesDriven = action.payload;
        },
        updateCarDriven: ( state, action ) => {
            state.carDriven = action.payload;
            state.averageIceRange = CAR_DATA.find( (car) => action.payload === car.id ).average_range;   
        },
        updateDataEntered: ( state, action ) => {
            state.dataEntered = action.payload;
        }
    }
})

export const { updateMilesDriven, updateCarDriven, updateDataEntered } = userSlice.actions;

export default userSlice.reducer;