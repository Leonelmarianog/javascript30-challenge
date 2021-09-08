import { moveClockHands } from '../ui.js';
import { body } from './fixtures/body.js';

beforeAll(() => {
    document.body.innerHTML = body;
});

describe('moveClockHands', () => {
    describe('when passed numbers', () => {
        it('Updates the DOM to rotate the clock hands', () => {
            const hoursHandDegreeRotation = -172.5;
            const minutesHandDegreeRotation = -87;
            const secondsHandDegreeRotation = 0;

            moveClockHands(hoursHandDegreeRotation, minutesHandDegreeRotation, secondsHandDegreeRotation);

            expect(document.querySelector('.hours-hand').style.transform).toBe(`rotate(${hoursHandDegreeRotation}deg)`);
            expect(document.querySelector('.minutes-hand').style.transform).toBe(`rotate(${minutesHandDegreeRotation}deg)`);
            expect(document.querySelector('.seconds-hand').style.transform).toBe(`rotate(${secondsHandDegreeRotation}deg)`);
        });
    });
});