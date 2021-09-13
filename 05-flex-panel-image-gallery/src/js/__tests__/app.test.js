import { init } from '../app.js';
import { toggleElementClass } from '../ui/ui.js';
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
    it('Initializes app', () => {
      const eventListenerSpy = jest.spyOn(EventTarget.prototype, 'addEventListener');

      init();

      expect(eventListenerSpy).toHaveBeenCalledTimes(1);
      expect(eventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
    });
  });

  describe('When a click happens on a panel', () => {
    test('"toggleElementClass" should be called with the panel HTML element and the string "open" as arguments', () => {
      init();

      const $panel = document.querySelector('#panel1');

      const clickEvent = new Event('click', {
        bubbles: true,
      });

      $panel.dispatchEvent(clickEvent);

      expect(toggleElementClass).toHaveBeenCalledTimes(1);
      expect(toggleElementClass).toHaveBeenCalledWith($panel, 'open');
    });
  });

  describe("When a click happens on a panel's child element", () => {
    test('"toggleElementClass" should be called with the parent panel HTML element and the string "open" as arguments', () => {
      init();

      const $panel = document.querySelector('#panel1');
      const $panelFirstChild = $panel.querySelector('p:first-child');

      const clickEvent = new Event('click', {
        bubbles: true,
      });

      $panelFirstChild.dispatchEvent(clickEvent);

      expect(toggleElementClass).toHaveBeenCalledTimes(1);
      expect(toggleElementClass).toHaveBeenCalledWith($panel, 'open');
    });
  });

  describe('When a click happens outside a panel', () => {
    test('"toggleElementClass" should not be called', () => {
      init();

      const $panels = document.querySelector('#panels');

      const clickEvent = new Event('click', {
        bubbles: true,
      });

      $panels.dispatchEvent(clickEvent);

      expect(toggleElementClass).not.toHaveBeenCalled();
    });
  });
});
