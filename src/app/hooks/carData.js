import { drivingTelemetryReducer } from './drivingTelemetry';
import { carDetailsReducer } from './carDetails';

export const UPDATE_MILES_DRIVEN = 'UPDATE_MILES_DRIVEN';
export const UPDATE_CAR_TYPE = 'UPDATE_CAR_TYPE';
export const UPDATE_HYBRID = 'UPDATE_HYBRID';

//  the reducers we will call in order to create the state shape for car
const reducers = [ 
    carDetailsReducer, 
    drivingTelemetryReducer 
];

//  The current car state shape and the dispatched action
//  will be passed to the reducer function, which will
//  call each of the reducers in order, updating and returning the new
//  state shape within each reducer
export const carReducer = ( state = {}, action ) => {
    return reducers.reduce( ( _state, _reducer ) => {
        return _reducer( _state, action );
    }, state);
}
