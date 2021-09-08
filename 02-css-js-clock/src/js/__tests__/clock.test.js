import { init } from "../clock";
import { body } from './fixtures/body.js';

beforeAll(() => {
    document.body.innerHTML = body;
});

describe('init', () => {
    describe('when called', () => {
        it('initializes the clock', () => {
            // Issue with modern implementation of "useFakeTimers": https://github.com/facebook/jest/issues/11500
            // "useFakeTimers" requires "legacy" as argument for it to use an old implementation, otherwise, test fails.
            jest.useFakeTimers('legacy');

            const getHoursSpy = jest.spyOn(Date.prototype, 'getHours').mockReturnValue(0);
            const getMinutes = jest.spyOn(Date.prototype, 'getMinutes').mockReturnValue(15);
            const getSeconds = jest.spyOn(Date.prototype, 'getSeconds').mockReturnValue(30);

            const hoursHand = document.querySelector('.hours-hand');
            const minutesHand = document.querySelector('.minutes-hand');
            const secondsHand = document.querySelector('.seconds-hand');
    
            init();

            // before a second passes
            expect(hoursHand.style.transform).toBe('');
            expect(minutesHand.style.transform).toBe('');
            expect(secondsHand.style.transform).toBe('');

            jest.advanceTimersByTime(1000);

            // after one second
            expect(setInterval).toHaveBeenCalledTimes(1);
            expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
            expect(hoursHand.style.transform).toBe('rotate(-172.5deg)');
            expect(minutesHand.style.transform).toBe('rotate(-87deg)');
            expect(secondsHand.style.transform).toBe('rotate(0deg)');

            getHoursSpy.mockReturnValue(1);
            getMinutes.mockReturnValue(30);
            getSeconds.mockReturnValue(60);

            jest.advanceTimersByTime(1000);

            // after two seconds
            expect(hoursHand.style.transform).toBe('rotate(-135deg)');
            expect(minutesHand.style.transform).toBe('rotate(6deg)');
            expect(secondsHand.style.transform).toBe('rotate(180deg)');
        });
    });
});
