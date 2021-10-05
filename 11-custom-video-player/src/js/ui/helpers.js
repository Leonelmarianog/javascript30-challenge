const $skipBackwardsHelper = document.querySelector('#skip-backwards-helper');
const $skipBackwardsIcon = document.querySelector('.skip-backwards-icon');
const $skipBackwardsText = document.querySelector('#skip-backwards-text');

const $skipForwardsHelper = document.querySelector('#skip-forwards-helper');
const $skipForwardsIcon = document.querySelector('.skip-forwards-icon');
const $skipForwardsText = document.querySelector('#skip-forwards-text');

const $middleHelper = document.querySelector('#middle-helper');

const updateMiddleHelperInnerHtml = (element) => {
  $middleHelper.innerHTML = element.outerHTML;
};

const updateSkipFordwardsText = (text) => {
  $skipForwardsText.textContent = text;
};

const updateSkipBackwardsText = (text) => {
  $skipBackwardsText.textContent = text;
};

const startElementAnimation = (element, animation) => {
  element.classList.add(animation);
};

const stopElementAnimation = (element, animation) => {
  element.classList.remove(animation);
};

const resetElementAnimation = (element, animation) => {
  stopElementAnimation(element, animation);

  window.requestAnimationFrame(() => {
    startElementAnimation(element, animation);
  });
};

export const displayMiddleHelper = (icon) => {
  updateMiddleHelperInnerHtml(icon);
  resetElementAnimation($middleHelper, 'fade-in-out-and-scale');
};

export const displaySkipBackwardsHelper = (skipAmountInSeconds) => {
  updateSkipBackwardsText(`${skipAmountInSeconds} seconds`);
  resetElementAnimation($skipBackwardsHelper, 'come-and-go');
  resetElementAnimation($skipBackwardsIcon, 'color-fade');
};

export const hideSkipBackwardsHelper = () => {
  stopElementAnimation($skipBackwardsHelper, 'come-and-go');
  stopElementAnimation($skipBackwardsIcon, 'color-fade');
};

export const displaySkipForwardsHelper = (skipAmountInSeconds) => {
  updateSkipFordwardsText(`${skipAmountInSeconds} seconds`);
  resetElementAnimation($skipForwardsHelper, 'come-and-go');
  resetElementAnimation($skipForwardsIcon, 'color-fade');
};

export const hideSkipForwardsHelper = () => {
  stopElementAnimation($skipForwardsHelper, 'come-and-go');
  stopElementAnimation($skipForwardsIcon, 'color-fade');
};
