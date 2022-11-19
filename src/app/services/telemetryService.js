import { 
    DEFAULT_ICE_RANGE, 
    DEFAULT_EV_RANGE, 
    DEFAULT_MILES_PER_DAY_WEEKEND,
    DEFAULT_MIN_ICE_RANGE,
    DEFAULT_MIN_EV_RANGE,
    WEEKS,
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
 * @param {Number} distPerYear
 */
export const calcDistPerDay = (distPerDayWeekday, distPerYear) => {
    /*
    Algorigm
    1. Drive distPerDayWeekday every weekday
    2. Drive 10 miles every weekend day (DEFAULT_MILES_PER_DAY_WEEKEND)
    3. Calculate remaining miles to get to distPerYear
    4. Divide remaining miles into 1/3 210 and 2/3 410 mile travel days
    5. Place remaining miles on a random weekend day that doesn't have much driving
    */

    let length = WEEKS*7;
    let days = new Array(length);
    let normalizedDistPerYear = Math.ceil(distPerYear * WEEKS/52)
    for(let week=0; week<WEEKS; week++){
        let fillindex=week*7
        days.fill(distPerDayWeekday, fillindex, fillindex+5);
        days.fill(DEFAULT_MILES_PER_DAY_WEEKEND, fillindex+5, fillindex+7);
    }

    let remaining = normalizedDistPerYear - distPerDayWeekday * WEEKS * 5 - DEFAULT_MILES_PER_DAY_WEEKEND * WEEKS * 2
    if( remaining <= 0 ){
        return days;
    }

    let two_hundreds = Math.floor(remaining/200)
    let travel_400 = Math.floor(two_hundreds/3)
    let travel_200 = two_hundreds - travel_400*2
    remaining = remaining-travel_200*200-travel_400*400;

    let travel_400_mod = Math.floor(WEEKS/travel_400)
    let travel_200_mod = Math.floor(WEEKS/travel_200)

    let travel_400_remaining = travel_400
    let travel_200_remaining = travel_200
    for(let week=0; week<WEEKS; week++){ //TODO: could do this by looping travel_400 and travel_200 times
        if(travel_400_remaining > 0 && (WEEKS-week) % travel_400_mod == 1){ //we use 1 here to provide some offset
            days[week*7+6] += 400
            travel_400_remaining -= 1
        }
        if(travel_200_remaining > 0 && (WEEKS-week) % travel_200_mod == 0){
            days[week*7+5] += 200
            travel_200_remaining -= 1
        }
    }

    //place remaining miles
    for(let week=WEEKS-1; week>=0; week--){
        if(days[week*7+6] == DEFAULT_MILES_PER_DAY_WEEKEND){
            days[week*7+6] += remaining;
            break;
        }
        if(days[week*7+5] == DEFAULT_MILES_PER_DAY_WEEKEND){
            days[week*7+5] += remaining;
            break;
        }
    }

    return days
}

/**
 * Calculate daily driving telemetry 
 * for both EV and ICE data
 * 
 * @param {Number} milesPerDayWeekday
 * @param {Number} milesPerYear
 * @param {Number} iceRange 
 * @param {Number} evRange 
 */
export const calculateDailyDriving = (milesPerDayWeekday, milesPerYear, iceRange = DEFAULT_ICE_RANGE, evRange = DEFAULT_EV_RANGE ) => {

    const distDays = calcDistPerDay( milesPerDayWeekday, milesPerYear );

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
        milesPerYear,
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