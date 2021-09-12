import { setSpacing, setBlur, setColor } from './ui/ui.js';

/**
 * @param {Event} e
 */
const handleSpacing = (e) => {
  const inputValue = Number(e.target.value);
  const $photo = document.querySelector('#photo');

  setSpacing(inputValue, $photo);
};

/**
 * @param {Event} e
 */
const handleBlur = (e) => {
  const inputValue = Number(e.target.value);
  const $photo = document.querySelector('#photo');

  setBlur(inputValue, $photo);
};

/**
 * @param {Event} e
 */
const handleColor = (e) => {
  const {
    target: { value: inputValue },
  } = e;
  const $photo = document.querySelector('#photo');

  setColor(inputValue, $photo);
};

export const init = () => {
  const $spacingInput = document.querySelector('#spacing');
  const $blurInput = document.querySelector('#blur');
  const $colorInput = document.querySelector('#color');

  $spacingInput.addEventListener('input', handleSpacing);
  $blurInput.addEventListener('input', handleBlur);
  $colorInput.addEventListener('input', handleColor);
};
