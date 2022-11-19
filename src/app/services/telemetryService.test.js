import { calcDistPerDay } from './telemetryService';

it('dist per day no long distance travel', () => {
    let result = calcDistPerDay(20, 10000);
    expect(result.length).toEqual(56);
    expect(result[0]).toEqual(20);
    expect(result.reduce((a, b) => a + b, 0)).toEqual(1539);
    expect(result.filter(n => n == 210)).toHaveLength(2);
    expect(result.includes(410)).toEqual(false);
});

it('dist per day with long distance travel', () => {
    let result = calcDistPerDay(15, 10000);
    expect(result.length).toEqual(56);
    expect(result[0]).toEqual(15);
    expect(result.reduce((a, b) => a + b, 0)).toEqual(1539);
    expect(result.filter(n => n == 210)).toHaveLength(1);
    expect(result.filter(n => n == 410)).toHaveLength(1);
});
