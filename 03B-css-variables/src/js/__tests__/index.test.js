import { init } from '../app.js';
import '../index.js';

jest.mock('../app.js');

describe('init', () => {
  it('initializes app', () => {
    expect(init).toHaveBeenCalledTimes(1);
  });
});
