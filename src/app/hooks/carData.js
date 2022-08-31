import { DEFAULT_MILES_PER_DAY_WEEKDAY, DEFAULT_ICE_RANGE, CAR_DATA } from '../globals';

export const UPDATE_MILES_DRIVEN = 'UPDATE_MILES_DRIVEN';
export const UPDATE_CAR_TYPE = 'UPDATE_CAR_TYPE';

const initialState = {
    milesDriven: DEFAULT_MILES_PER_DAY_WEEKDAY,
    carDriven: null,
    averageIceRange: DEFAULT_ICE_RANGE,
    dataEntered: false,
};

export const carDataReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case UPDATE_MILES_DRIVEN:
            state.milesDriven = action.payload;
            break;
        case UPDATE_CAR_TYPE:
            state.carDriven = action.payload;
            break;
    }

    return state;
}
