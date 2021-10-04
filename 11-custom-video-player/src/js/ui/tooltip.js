import { calcPercentageOfTotal, clamp } from '../utils/utils.js';

/**
 * @param {HTMLElement} target
 * @param {HTMLElement} element
 * @returns {Object<string, number>}
 */
const getCoordinatesRelativeToParent = (child, parent) => {
  const childRect = child.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  return {
    top: childRect.top - parentRect.top,
    right: parentRect.right - childRect.right,
    bottom: parentRect.bottom - childRect.bottom,
    left: childRect.left - parentRect.left,
  };
};

const $playerControls = document.querySelector('#player-controls');
const $progressBar = document.querySelector('#progress-bar');
const $tooltip = document.querySelector('#button-tooltip');

/**
 * @param {string} text
 */
export const setButtonTooltipContent = (string) => {
  $tooltip.innerHTML = string;
};

export const displayButtonTooltip = () => {
  $tooltip.style.visibility = 'visible';
};

export const hideButtonTooltip = () => {
  $tooltip.style.visibility = 'hidden';
};

const updateTooltipLeftCoord = (left) => {
  $tooltip.style.left = left;
};

/**
 * @param {HTMLElement} element
 */
export const attachButtonTooltipTo = (element) => {
  const elementRect = getCoordinatesRelativeToParent(element, $playerControls);
  const progressBarRect = getCoordinatesRelativeToParent($progressBar, $playerControls);

  let left = elementRect.left + element.offsetWidth / 2 - $tooltip.offsetWidth / 2;

  left = clamp(left, {
    min: progressBarRect.left,
    max: progressBarRect.left + $progressBar.offsetWidth - $tooltip.offsetWidth,
  });
  /* left = calcPercentageOfTotal(left, $progressBar.offsetWidth); */

  $tooltip.style.left = `${left}px`;
};
