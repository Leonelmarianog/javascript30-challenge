import { init } from "../drumkit";
import { playKeySound, toggleKeyClass } from '../ui/ui.js';
import body from './fixtures/body.js';

beforeEach(() => {
    document.body.innerHTML = body;
    jest.clearAllMocks();
});

describe('init', () => {
    describe('when called', () => {
        it('initializes drumkit', () => {
            const $keys = document.querySelector('.keys');

            const keysListenerSpy = jest.spyOn($keys, 'addEventListener');
            const documentListenerSpy = jest.spyOn(document, 'addEventListener');

            init();

            expect(keysListenerSpy).toHaveBeenCalledTimes(1);
            expect(keysListenerSpy).toHaveBeenCalledWith('click', playKeySound);
            expect(documentListenerSpy).toHaveBeenCalledTimes(3);
            expect(documentListenerSpy).toHaveBeenNthCalledWith(1, 'keydown', playKeySound);
            expect(documentListenerSpy).toHaveBeenNthCalledWith(2, 'keydown', toggleKeyClass);
            expect(documentListenerSpy).toHaveBeenNthCalledWith(3, 'keyup', toggleKeyClass);
        });
    });
});