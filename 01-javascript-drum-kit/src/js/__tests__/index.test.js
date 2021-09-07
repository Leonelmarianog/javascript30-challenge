import { init } from "../drumkit.js";
import '../index.js';

jest.mock('../drumkit.js');

describe('init', () => {
    it('Initializes drumkit', () => {
        expect(init).toHaveBeenCalledTimes(1);
    });
});
