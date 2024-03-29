import { 
    DEFAULT_MILES_PER_DAY_WEEKDAY,
    DEFAULT_ICE_RANGE,
    CAR_DATA,
    DEFAULT_MPG 
} from '../globals';

import {
    UPDATE_MILES_DRIVEN,
    UPDATE_MILES_PER_YEAR,
    UPDATE_CAR_TYPE,
    UPDATE_HYBRID
} from './carData';

export const carDetailsReducer = ( state = {}, action ) => {
    
    // if(!state.carDriven) {
    //     state.carDriven = 'sedan';
    // }
    let car;
    switch( action.type ) {
        case UPDATE_MILES_DRIVEN:
            return {
                ...state,
                milesDriven: Number(action.payload)
            }
        case UPDATE_MILES_PER_YEAR:
            return {
                ...state,
                milesDrivenPerYear: Number(action.payload)
            }
        case UPDATE_CAR_TYPE:
            car = CAR_DATA.find( c => c.id === action.payload );
            return {
                ...state,
                carDriven: action.payload,
                averageIceRange: car.average_range,
                mpg: ( state.isHybrid ) ? car.hybrid_mpg : car.mpg,
                averageIceRange: ( state.isHybrid ) ? car.hybrid_range : car.average_range,
            }
        case UPDATE_HYBRID:
            car = CAR_DATA.find( c => c.id === state.carDriven );
            return {
                ...state,
                isHybrid: action.payload,
                mpg: ( action.payload ) ? car.hybrid_mpg : car.mpg,
                averageIceRange: ( action.payload ) ? car.hybrid_range : car.average_range,
            }
        default:
            return state;
    }
}