import { init } from '../app.js';
import { setRootVariables } from '../ui/ui.js';
import { body } from './fixtures/body.js';

jest.mock('../ui/ui.js');

beforeAll(() => {
  document.body.innerHTML = body;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('init', () => {
  describe('when invoked', () => {
    it('should initialize the app', () => {
      const eventListenerSpy = jest.spyOn(EventTarget.prototype, 'addEventListener');

      init();

      expect(eventListenerSpy).toHaveBeenCalledTimes(3);
      expect(eventListenerSpy).toHaveBeenNthCalledWith(1, 'input', expect.any(Function));
      expect(eventListenerSpy).toHaveBeenNthCalledWith(2, 'input', expect.any(Function));
      expect(eventListenerSpy).toHaveBeenNthCalledWith(3, 'input', expect.any(Function));
    });
  });

  describe('When the "spacing" input value changes', () => {
    test('"setRootVariables" should be called with an object of css variables', () => {
      const $input = document.querySelector('#spacing');
      const inputValueMock = 50;
      $input.value = inputValueMock;

      const {
        name: inputName,
        value: inputValue,
        dataset: { unit: suffix },
      } = $input;

      const cssVars = {
        [`--${inputName}`]: `${inputValue}${suffix}`,
      };

      init();

      const inputEvent = new Event('input');
      $input.dispatchEvent(inputEvent);

      expect(setRootVariables).toHaveBeenCalledTimes(1);
      expect(setRootVariables).toHaveBeenCalledWith(cssVars);
    });
  });

  describe('When the "blur" input value changes', () => {
    test('"setRootVariables" should be called with an object of css variables', () => {
      const $input = document.querySelector('#blur');
      const inputValueMock = 50;
      $input.value = inputValueMock;

      const {
        name: inputName,
        value: inputValue,
        dataset: { unit: suffix },
      } = $input;

      const cssVars = {
        [`--${inputName}`]: `${inputValue}${suffix}`,
      };

      init();

      const inputEvent = new Event('input');
      $input.dispatchEvent(inputEvent);

      expect(setRootVariables).toHaveBeenCalledTimes(1);
      expect(setRootVariables).toHaveBeenCalledWith(cssVars);
    });
  });

  describe('When the "color" input value changes', () => {
    test('"setRootVariables" should be called with an object of css variables', () => {
      const $input = document.querySelector('#blur');
      const inputValueMock = '#ffffff';
      $input.value = inputValueMock;

      const {
        name: inputName,
        value: inputValue,
        dataset: { unit: suffix },
      } = $input;

      const cssVars = {
        [`--${inputName}`]: `${inputValue}${suffix}`,
      };

      init();

      const inputEvent = new Event('input');
      $input.dispatchEvent(inputEvent);

      expect(setRootVariables).toHaveBeenCalledTimes(1);
      expect(setRootVariables).toHaveBeenCalledWith(cssVars);
    });
  });
});
