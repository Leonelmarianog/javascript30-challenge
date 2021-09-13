import { setRootVariables } from './ui/ui.js';

/**
 * @param {Event} e
 */
const handleInput = (e) => {
  const {
    target: {
      name: inputName,
      value: inputValue,
      dataset: { unit: suffix },
    },
  } = e;

  const cssVars = {
    [`--${inputName}`]: `${inputValue}${suffix}`,
  };

  setRootVariables(cssVars);
};

export const init = () => {
  const $spacingInput = document.querySelector('#spacing');
  const $blurInput = document.querySelector('#blur');
  const $colorInput = document.querySelector('#color');

  $spacingInput.addEventListener('input', handleInput);
  $blurInput.addEventListener('input', handleInput);
  $colorInput.addEventListener('input', handleInput);
};
