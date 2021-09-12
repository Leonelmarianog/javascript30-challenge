import { init } from '../app.js';
import { setSpacing, setBlur, setColor } from '../ui/ui.js';
import { body } from './fixtures/body.js';

jest.mock('../ui/ui.js');

beforeAll(() => {
  document.body.innerHTML = body;
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
    test('"setSpacing" should be called with the input value and the element to update', () => {
      const $spacingInput = document.querySelector('#spacing');
      const $photo = document.querySelector('#photo');
      const inputValueMock = 50;
      $spacingInput.value = inputValueMock;

      init();

      const inputEvent = new Event('input');
      $spacingInput.dispatchEvent(inputEvent);

      expect(setSpacing).toHaveBeenCalledTimes(1);
      expect(setSpacing).toHaveBeenCalledWith(inputValueMock, $photo);
    });
  });

  describe('When the "blur" input value changes', () => {
    test('"setBlur" should be called with the input value and the element to update', () => {
      const $blurInput = document.querySelector('#blur');
      const $photo = document.querySelector('#photo');
      const inputValueMock = 50;
      $blurInput.value = inputValueMock;

      init();

      const inputEvent = new Event('input');
      $blurInput.dispatchEvent(inputEvent);

      expect(setBlur).toHaveBeenCalledTimes(1);
      expect(setBlur).toHaveBeenCalledWith(inputValueMock, $photo);
    });
  });

  describe('When the "color" input value changes', () => {
    test('"setColor" should be called with the input value and the element to update', () => {
      const $colorInput = document.querySelector('#color');
      const $photo = document.querySelector('#photo');
      const inputValueMock = '#ff00ff';
      $colorInput.value = inputValueMock;

      init();

      const inputEvent = new Event('input');
      $colorInput.dispatchEvent(inputEvent);

      expect(setColor).toHaveBeenCalledTimes(1);
      expect(setColor).toHaveBeenCalledWith(inputValueMock, $photo);
    });
  });
});
