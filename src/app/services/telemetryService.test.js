import { calculateDates, calcDistPerDay, calculateDailyDriving } from './telemetryService';

it('dist per day no long distance travel', () => {
    let result = calcDistPerDay(8, 20, 10000);
    expect(result.length).toEqual(56);
    expect(result[0]).toEqual(20);
    expect(result.reduce((a, b) => a + b, 0)).toEqual(1539);
    expect(result.filter(n => n == 210)).toHaveLength(2);
    expect(result.includes(410)).toEqual(false);
});

it('dist per day with long distance travel', () => {
    let result = calcDistPerDay(8, 15, 10000);
    expect(result.length).toEqual(56);
    expect(result[0]).toEqual(15);
    expect(result.reduce((a, b) => a + b, 0)).toEqual(1539);
    expect(result.filter(n => n == 210)).toHaveLength(1);
    expect(result.filter(n => n == 410)).toHaveLength(1);
});

it('caclulates dates', () => {
    let dates = calculateDates(new Date(2022,10,19), 8);
    expect(dates).toHaveLength(56);
    expect(new Date(dates[0])).toEqual(new Date(2022,10,21));
    expect(new Date(dates[55])).toEqual(new Date(2023,0,15));
});

it('calculates min distances', () => {
    let result = calculateDailyDriving(15, 10000);
    expect(result.iceDates[55].dist).toEqual(result.evDates[55].dist);
});
