import { setSpacing, setBlur, setColor } from '../ui.js';

describe('setSpacing', () => {
  describe('when called on an element without border', () => {
    it('should set the border size, border type and border color of the element', () => {
      const $element = document.createElement('img');
      const borderSize = 50;

      setSpacing(borderSize, $element);

      expect($element.style.border).toBe(`${borderSize}px solid #000`);
    });
  });

  describe('when called on an element with border', () => {
    it('should set only the border size of the element', () => {
      const $element = document.createElement('img');
      $element.style.border = '100px solid #fff';
      const borderSize = 50;

      setSpacing(borderSize, $element);

      expect($element.style.border).toBe(`${borderSize}px solid #fff`);
    });
  });
});

describe('setBlur', () => {
  it('should set the blur filter of an element', () => {
    const $element = document.createElement('img');
    const blurValue = 50;

    setBlur(blurValue, $element);

    expect($element.style.filter).toBe(`blur(${blurValue}px)`);
  });
});

describe('setColor', () => {
  describe('when called on an element without border', () => {
    it('should set the border size, border type, and border color of the element', () => {
      const $element = document.createElement('img');
      const borderColor = '#fff';

      setColor(borderColor, $element);

      expect($element.style.border).toBe(`0px solid ${borderColor}`);
    });
  });

  describe('when called on an element with border', () => {
    it('should set only the border color of the element', () => {
      const $element = document.createElement('img');
      $element.style.border = '100px solid #fff';
      const borderColor = '#000';

      setColor(borderColor, $element);

      expect($element.style.border).toBe(`100px solid ${borderColor}`);
    });
  });
});
