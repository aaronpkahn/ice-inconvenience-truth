import { 
    DAYS, 
    DEFAULT_ICE_RANGE, 
    DEFAULT_EV_RANGE, 
    DEFAULT_MIN_ICE_RANGE,
    DEFAULT_MIN_EV_RANGE,
} from '../globals';

/**
 * Calculate the daily range remaining at EOD 
 * after accounting for commute and vacation miles
 *  
 * @param {*} distDays 
 * @param {*} scaleDenominator 
 * @param {Number} range 
 * @param {Number} refuelThreshold 
 */
export const calcMinDistances = ( { distDays, range, refuelThreshold, scaleDenominator } ) => {
    let date = new Date();
    let values = [];
    let currentRange = range;
    
    date.setDate(date.getDate() + 1);

    for( let dist of distDays ) {
        currentRange -= dist;

        values.push({
            dist, 
            minRange: Math.max( 0, currentRange ), 
            date: new Date(date.getTime()).toDateString() 
        });

        if (currentRange < refuelThreshold) {
            currentRange = range;
        }

        date.setDate(date.getDate() + 1);
    }

    return values;
}

/**
 * Calculate the number of miles driven daily 
 * based on commute and vacation averages
 * 
 * @param {Number} distPerDayWeekday 
 */
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

/**
 * Calculate daily driving telemetry 
 * for both EV and ICE data
 * 
 * @param {Number} milesPerDayWeekday 
 * @param {Number} iceRange 
 * @param {Number} evRange 
 */
export const calculateDailyDriving = (milesPerDayWeekday, iceRange = DEFAULT_ICE_RANGE, evRange = DEFAULT_EV_RANGE ) => {

    const distDays = calcDistPerDay( milesPerDayWeekday );

    const evDates = calcMinDistances({ 
        distDays, 
        range: evRange, 
        refuelThreshold: DEFAULT_MIN_EV_RANGE 
    });

    const iceDates = calcMinDistances({ 
        distDays, 
        range: iceRange, 
        refuelThreshold:  DEFAULT_MIN_ICE_RANGE 
    });

    const len = evDates.length;
    const reducer = (a,c) => a + c.minRange/len

    const iceAvgMinRange    = Math.floor(iceDates.reduce(reducer, 0));
    const evAvgMinRange     = Math.floor(evDates.reduce(reducer, 0));
    
    return {
        milesPerDayWeekday,
        iceAvgMinRange,
        evAvgMinRange,
        evDates,
        iceDates,
    }
}

export const calculateRechargeTime = ( distDays, timeToRefill ) => {

    let refillTime = 0;

    const reducer = ( prev, current, index ) => {
        if ( 
            index > 0 &&
            index < distDays.length - 1 && 
            current.minRange < distDays[index-1].minRange &&
            current.minRange < distDays[index+1].minRange
        ) {
            refillTime += timeToRefill;
        } 

        const data = {
            refillTime,
            ...current
        }
        return [ ...prev, data ];
    };

    return distDays.reduce( reducer, [] );
}

export const calculateRefillTime = ( distDays, timeToRefill ) => {

    let refillTime = 0;

    const reducer = ( prev, current, index ) => {
        if ( 
            index > 0 &&
            index < distDays.length - 1 && 
            current.minRange > distDays[index-1].minRange &&
            current.minRange > distDays[index+1].minRange
        ) {
            refillTime += timeToRefill;
        } 

        const data = {
            refillTime,
            ...current
        }
        return [ ...prev, data ];
    };

    return distDays.reduce( reducer, [] );
}