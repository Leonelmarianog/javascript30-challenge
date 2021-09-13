import { setRootVariables } from '../ui.js';

describe('setRootVariables', () => {
  describe('When passed an object of css variables as argument', () => {
    it('should set new css variables into documentElement', () => {
      const cssVars = {
        ['--new-css-var']: '50px',
      };

      setRootVariables(cssVars);

      const expectedValue = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--new-css-var');

      expect(expectedValue).toBe(cssVars['--new-css-var']);
    });
  });
});
