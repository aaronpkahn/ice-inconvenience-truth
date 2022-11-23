import { 
    UPDATE_MILES_DRIVEN,
    UPDATE_MILES_PER_YEAR,
    UPDATE_CAR_TYPE, 
    UPDATE_HYBRID 
} from './carData';

import * as telemetryService from '../services/telemetryService';

export const drivingTelemetryReducer = ( state = {}, action ) => {
    switch( action.type ) {
        case UPDATE_MILES_DRIVEN:
        case UPDATE_MILES_PER_YEAR:
        case UPDATE_CAR_TYPE:
        case UPDATE_HYBRID:

            const { 
                evDates, 
                iceDates,
                distDates
            } = telemetryService.calculateDailyDriving( state.milesDriven, state.milesDrivenPerYear, state.averageIceRange );

            return { 
                ...state,
                evDates, 
                iceDates,
                distDates
            }
            
        default:
            return state;
    }
}