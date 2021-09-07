import { toggleKeyClass, playKeySound } from '../ui.js';
import { playSoundByName } from '../../utils/utils.js';
import body from './fixtures/body.js' 

jest.mock('../../utils/utils.js', () => ({
    ...jest.requireActual('../../utils/utils.js'),
    playSoundByName: jest.fn(),
}));

beforeEach(() => {
    document.body.innerHTML = body;
    jest.clearAllMocks();
});

describe('toggleKeyClass', () => {
    describe('When a keydown event is triggered', () => {
        it('Should add an "active" class to the HTML button linked to the event', () => {
            const event = {
                key: 'a',
                type: 'keydown'
            };

            expect(document.querySelector(`[data-keyname="A"]`).classList.contains('active')).toBe(false);

            toggleKeyClass(event);

            expect(document.querySelector(`[data-keyname="A"]`).classList.contains('active')).toBe(true);
        });
    });

    describe('When a keyup event is triggered', () => {
        it('Should remove the "active" class from the HTML button linked to the event', () => {
            const event = {
                key: 'a',
                type: 'keydown'
            };

            toggleKeyClass(event);

            expect(document.querySelector(`[data-keyname="A"]`).classList.contains('active')).toBe(true);

            event.type = 'keyup';

            toggleKeyClass(event);

            expect(document.querySelector(`[data-keyname="A"]`).classList.contains('active')).toBe(false);
        });
    });

    describe('When a keydown or keyup event is triggered', () => {
        it('Should do nothing when there is no HTML button linked to the event', () => {
            const event = {
                key: 'c',
                type: 'keydown'
            };

            expect(toggleKeyClass(event)).toBe(false);
        });
    });
});

describe('playKeySound', () => {
    describe('When a keydown event is triggered', () => {
        it('should play a sound if the key pressed corresponds to one of the defined HTML buttons', () => {
            const event = {
                key: 'a',
                type: 'keydown',
            };

            playKeySound(event);

            expect(playSoundByName).toHaveBeenCalledTimes(1);
            expect(playSoundByName).toHaveBeenCalledWith('clap');
        });

        it('should do nothing when the key pressed does not correspond to any of the defined HTML buttons', () => {
            const event = {
                key: 'c',
                type: 'keydown',
            };

            playKeySound(event);

            expect(playSoundByName).toHaveBeenCalledTimes(0);
        });
    });

    describe('When a click event is triggered', () => {
        it('should play a sound if the click happened on any of the defined HTML buttons', () => {
            const event = {
                key: 'a',
                type: 'click',
                target: document.querySelector('[data-keyname="A"]'),
            };

            playKeySound(event);

            expect(playSoundByName).toHaveBeenCalledTimes(1);
            expect(playSoundByName).toHaveBeenCalledWith('clap');
        });

        it('should play a sound if the click happened on one of the child elements of the defined HTML buttons', () => {
            const event = {
                key: 'a',
                type: 'click',
                target: document.querySelector('[data-keyname="A"] > p'),
            };

            playKeySound(event);

            expect(playSoundByName).toHaveBeenCalledTimes(1);
            expect(playSoundByName).toHaveBeenCalledWith('clap');
        });

        it('should do nothing if the click did not happen on any of the defined HTML buttons', () => {
            const event = {
                key: 'a',
                type: 'click',
                target: document.querySelector('.keys'),
            };

            playKeySound(event);

            expect(playSoundByName).toHaveBeenCalledTimes(0);
        });
    });
});
