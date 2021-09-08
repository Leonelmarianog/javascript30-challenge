import { getHoursInDegrees, getMinutesInDegrees, getSecondsInDegrees } from "../utils";

beforeAll(() => {
    jest.spyOn(Date.prototype, 'getHours').mockReturnValue(0);
    jest.spyOn(Date.prototype, 'getMinutes').mockReturnValue(15);
    jest.spyOn(Date.prototype, 'getSeconds').mockReturnValue(30);
});

describe('getHoursInDegrees', () => {
    describe('when passed a valid date', () => {
        it('converts hours to degrees', () => {
            const date = new Date();

            const hoursDegrees = getHoursInDegrees(date);

            expect(hoursDegrees).toBe(-172.5);
        });
    });
});

describe('getMinutesInDegrees', () => {
    describe('when passed a valid date', () => {
        it('converts minutes to degrees', () => {
            const date = new Date();

            const minutesDegrees = getMinutesInDegrees(date);

            expect(minutesDegrees).toBe(-87);
        });
    });
});

describe('getSecondsInDegrees', () => {
    describe('when passed a valid date', () => {
        it('converts seconds to degrees', () => {
            const date = new Date();

            const secondsDegrees = getSecondsInDegrees(date);

            expect(secondsDegrees).toBe(0);
        });
    });
});