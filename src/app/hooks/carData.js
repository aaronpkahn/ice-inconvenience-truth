import { DEFAULT_MILES_PER_DAY_WEEKDAY, DEFAULT_ICE_RANGE, CAR_DATA } from '../globals';
import { drivingTelemetryReducer } from './drivingTelemetry';

export const UPDATE_MILES_DRIVEN = 'UPDATE_MILES_DRIVEN';
export const UPDATE_CAR_TYPE = 'UPDATE_CAR_TYPE';
export const UPDATE_HYBRID = 'UPDATE_HYBRID';

const initialState = {
    milesDriven: DEFAULT_MILES_PER_DAY_WEEKDAY,
    carDriven: null,
    averageIceRange: DEFAULT_ICE_RANGE,
    isHybrid: false,
    dataEntered: false,
    evDates: [],
    iceDates: [],
};

export const carDataReducer = ( state = initialState, action ) => {
    let update;
    switch( action.type ) {
        case UPDATE_MILES_DRIVEN:
            update = {
                ...state,
                milesDriven: Number(action.payload)
            }
            break;
        case UPDATE_CAR_TYPE:
            update = {
                ...state,
                carDriven: action.payload,
                averageIceRange: Number( CAR_DATA.find( c => c.id === action.payload ).average_range )
            }
            break;
        case UPDATE_HYBRID:
            update = {
                ...state,
                isHybrid: action.payload
            }
            break;
        default:
    }

    // update  = drivingTelemetryReducer( update, action );
    
    return Object.assign({}, state, update );;
}
