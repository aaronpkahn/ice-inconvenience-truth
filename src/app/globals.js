export const START_DATE = '2017-12-31';
export const END_DATE = '2018-12-30';
export const WEEKS = 8;
export const DEFAULT_MPG = 30;
export const DEFAULT_ICE_RANGE = 410;
export const DEFAULT_EV_RANGE = 300;
export const DEFAULT_MILES_PER_DAY_WEEKDAY = 30;
export const DEFAULT_MILES_PER_DAY_WEEKEND = 10;
export const DEFAULT_MILES_PER_YEAR = 10000;
export const DEFAULT_MIN_ICE_RANGE = 35;
export const DEFAULT_MIN_EV_RANGE = 300;

export const DEFAULT_CAR_DRIVEN = 'sedan';

export const CAR_DATA = [
    {
        id: 'sedan', 
        label: 'Sedan', 
        average_range: 310,
        mpg: 30,
        hybrid_mpg: 45,
        hybrid_range: 555,
    },
    {
        id: 'compact_suv', 
        label: 'Compact SUV',
        average_range: 380,
        mpg: 27,
        hybrid_mpg: 35,
        hybrid_range: 450,
    },
    {
        id: 'truck',
        label: 'Truck',
        average_range: 410,
        mpg: 22.1,
        hybrid_mpg: 25,
        hybrid_range: 500,
    },
    {
        id: 'hummer',
        label: 'Hummer',
        average_range: 200,
        mpg: 14,
        hybrid_mpg: 14,
        hybrid_range: 200,
    }
];
