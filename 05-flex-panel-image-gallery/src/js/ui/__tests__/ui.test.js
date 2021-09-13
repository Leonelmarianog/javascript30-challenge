import { toggleElementClass } from '../ui';

describe('toggleElementClass', () => {
  it('should toggle a css class from an element', () => {
    const $element = document.createElement('div');
    const cssClass = 'open';

    toggleElementClass($element, cssClass);

    expect($element.classList.contains(cssClass)).toBe(true);

    toggleElementClass($element, cssClass);

    expect($element.classList.contains(cssClass)).toBe(false);
  });
});
