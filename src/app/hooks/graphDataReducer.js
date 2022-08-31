export const UPDATE_MILES_DRIVEN = 'UPDATE_MILES_DRIVEN';
export const UPDATE_CAR_TYPE = 'UPDATE_CAR_TYPE';
export const UPDATE_HYBRID = 'UPDATE_HYBRID';

const initialState = {
    iceData: [],
    evData: [],
    iceRefillTimes: null,
    
}

export const graphDataReducer = ( state = initialState, action ) => {
    console.log('graph reducer', state );
    switch( action.type ) {
        case UPDATE_MILES_DRIVEN:
        case UPDATE_CAR_TYPE:
        case UPDATE_HYBRID:
            return {
                foo: 'set',
                ...state,
            }
        default:
            return state;
    }
}
