import { init } from '../app.js';
import { body } from './fixtures/body.js';
import { apiData } from './fixtures/data.js';

beforeAll(() => {
  document.body.innerHTML = body;
  window.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe('init', () => {
  it('sets event handlers', () => {
    const eventListenerSpy = jest.spyOn(EventTarget.prototype, 'addEventListener');

    init();

    expect(eventListenerSpy).toHaveBeenCalledTimes(1);
    expect(eventListenerSpy).toHaveBeenCalledWith('input', expect.any(Function));
  });
});

describe('User Events', () => {
  describe('When user inputs something', () => {
    test('result matches should appear on the datalist', async () => {
      const responseMock = {
        ok: true,
        json: () => apiData,
      };
      window.fetch.mockResolvedValueOnce(responseMock);
      const $input = document.querySelector('#city');
      $input.value = 'new york';

      init();

      const inputEvent = new Event('input');
      $input.dispatchEvent(inputEvent);

      await new Promise((resolve) => setTimeout(resolve, 4000)); // wait a little bit before asserting something...

      expect(document.querySelectorAll('li').length).toBe(1);
    });

    test('any error should get logged', async () => {
      const loggerSpy = jest.spyOn(console, 'error');
      const responseMock = {
        ok: false,
      };
      window.fetch.mockResolvedValueOnce(responseMock);
      const $input = document.querySelector('#city');

      init();

      const inputEvent = new Event('input');
      $input.dispatchEvent(inputEvent);

      await new Promise((resolve) => setTimeout(resolve, 4000));

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when user clears input', () => {
    test('datalist inner html should get cleared', async () => {
      const responseMock = {
        ok: true,
        json: () => apiData,
      };
      window.fetch.mockResolvedValueOnce(responseMock);
      const $input = document.querySelector('#city');
      $input.value = '';

      init();

      const inputEvent = new Event('input');
      $input.dispatchEvent(inputEvent);

      await new Promise((resolve) => setTimeout(resolve, 4000));

      expect(document.querySelector('#datalist').innerHTML).toBe('');
    });
  });
});
