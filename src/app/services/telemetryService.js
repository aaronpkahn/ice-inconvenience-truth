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
export const calcMinDistances = ( { distDates, range, refuelThreshold, scaleDenominator } ) => {
    let values = [];
    let currentRange = range;

    distDates.forEach(({dist, date}, i) => {
        currentRange -= dist;

        values.push({
            dist, 
            minRange: Math.max( 0, currentRange ), 
            date: date
        });

        if (currentRange < refuelThreshold) {
            currentRange = range;
        }
    });

    return values;
}

/**
 * Calculate the number of miles driven daily 
 * based on commute and vacation averages
 * 
 * @param {Number} weeks
 * @param {Number} distPerDayWeekday
 * @param {Number} distPerYear
 */
export const calcDistPerDay = (weeks, distPerDayWeekday, distPerYear) => {
    /*
    Algorigm
    1. Drive distPerDayWeekday every weekday
    2. Drive 10 miles every weekend day (DEFAULT_MILES_PER_DAY_WEEKEND)
    3. Calculate remaining miles to get to distPerYear
    4. Divide remaining miles into 1/3 210 and 2/3 410 mile travel days
    5. Place remaining miles on a random weekend day that doesn't have much driving
    */

    let length = weeks*7;
    let days = new Array(length);
    let normalizedDistPerYear = Math.ceil(distPerYear * weeks/52)
    for(let week=0; week<weeks; week++){
        let fillindex=week*7
        days.fill(distPerDayWeekday, fillindex, fillindex+5);
        days.fill(DEFAULT_MILES_PER_DAY_WEEKEND, fillindex+5, fillindex+7);
    }

    let remaining = normalizedDistPerYear - distPerDayWeekday * weeks * 5 - DEFAULT_MILES_PER_DAY_WEEKEND * weeks * 2
    if( remaining <= 0 ){
        return days;
    }

    let two_hundreds = Math.floor(remaining/200)
    let travel_400 = Math.floor(two_hundreds/3)
    let travel_200 = two_hundreds - travel_400*2
    remaining = remaining-travel_200*200-travel_400*400;

    let travel_400_mod = Math.floor(weeks/travel_400)
    let travel_200_mod = Math.floor(weeks/travel_200)

    let travel_400_remaining = travel_400
    let travel_200_remaining = travel_200
    for(let week=0; week<weeks; week++){ //TODO: could do this by looping travel_400 and travel_200 times
        if(travel_400_remaining > 0 && (weeks-week) % travel_400_mod == 1){ //we use 1 here to provide some offset
            days[week*7+6] += 400
            travel_400_remaining -= 1
        }
        if(travel_200_remaining > 0 && (weeks-week) % travel_200_mod == 0){
            days[week*7+5] += 200
            travel_200_remaining -= 1
        }
    }

    //place remaining miles
    for(let week=weeks-1; week>=0; week--){
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
 * Calculate dates for the coming weeks starting on next monday
 * 
 * @param {Date} startDate
 * @param {Number} weeks
 */
 export const calculateDates = (startDate, weeks) => {
    let dates = [];
    let date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

    // Start on the next monday
    date.setDate(date.getDate() + (7 - date.getDay()) % 7);
    for(let i=0; i<weeks*7; i++){
        date.setDate(date.getDate()+1);
        dates.push(new Date(date.getTime()));
    }

    return dates;
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

    const dists = calcDistPerDay( WEEKS, milesPerDayWeekday, milesPerYear );
    const dates = calculateDates( new Date(), WEEKS );

    const distDates = dists.map((dist, i) => {
        return { 
            dist,
            date: dates[i].toDateString() //TODO: ugh, do we really have to use a string for serialization reasons?
        };
    });

    const evDates = calcMinDistances({ 
        distDates,
        range: evRange, 
        refuelThreshold: DEFAULT_MIN_EV_RANGE 
    });

    const iceDates = calcMinDistances({ 
        distDates, 
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
        distDates,
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