import { init } from "../clock.js";
import '../index.js';

jest.mock('../clock.js');

describe('init', () => {
    it('initializes the clock', () => {
        expect(init).toHaveBeenCalledTimes(1);
    });
});
