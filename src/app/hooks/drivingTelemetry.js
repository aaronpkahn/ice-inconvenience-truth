import { 
    DAYS, 
    DEFAULT_ICE_RANGE, 
    DEFAULT_EV_RANGE, 
    DEFAULT_MIN_ICE_RANGE,
    DEFAULT_MIN_EV_RANGE,
} from '../globals';

import { UPDATE_MILES_DRIVEN, UPDATE_CAR_TYPE, UPDATE_HYBRID } from './carData';

export const drivingTelemetryReducer = ( state = {}, action ) => {
    console.log(state);
    switch( action.type ) {
        case UPDATE_MILES_DRIVEN:
        case UPDATE_CAR_TYPE:
        case UPDATE_HYBRID:

            const { 
                evDates, 
                iceDates 
            } = calcState( state.milesDriven, state.averageIceRange );
 
            return { 
                evDates, 
                iceDates,
                ...state
            }
        default:
            return state;
    }
}


export const calcMinDistances = (distDays, scaleDenominator, range, refuelThreshold) => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    let values = [];

    let currentRange = range;

    for( let dist of distDays ) {
        let scale = 10;
        currentRange -= dist;
        scale = Math.max(0,Math.floor(10*currentRange/scaleDenominator));

        values.push({ 
            scale, 
            dist, 
            minRange: (Math.max(0,currentRange)), 
            date: new Date(date.getTime()).toDateString() 
        });

        if (currentRange < refuelThreshold) {
            currentRange = range;
        }

        date.setDate(date.getDate() + 1);
    }

    return values;
}

export const calcDistPerDay = (distPerDayWeekday) => {
    let length = DAYS;
    let days = new Array(length);
    days.fill(distPerDayWeekday, 0, length);
    
    for(var week=0; week<52; week++){
        if( week % 7 == 4 ){
            days[week*7-2] = 400
        }
        if( week % 4 == 2 ){
            days[week*7-1] = 200
        }
    }
    return days
}

export const calcState = (milesPerDayWeekday, iceRange = DEFAULT_ICE_RANGE, evRange = DEFAULT_EV_RANGE ) =>{

    let distDays = calcDistPerDay(milesPerDayWeekday);
    var evDists = calcMinDistances(distDays, iceRange, evRange, DEFAULT_MIN_EV_RANGE);
    var iceDists = calcMinDistances(distDays, iceRange, iceRange, DEFAULT_MIN_ICE_RANGE);
    
    let len = evDists.length;
    const reducer = (a,c) => a + c.minRange/len

    let iceAvgMinRange = Math.floor(iceDists.reduce(reducer, 0));
    let evAvgMinRange = Math.floor(evDists.reduce(reducer, 0));
    
    return {
        milesPerDayWeekday,
        iceAvgMinRange,
        evAvgMinRange,
        evDates: evDists,
        iceDates: iceDists
    }
}