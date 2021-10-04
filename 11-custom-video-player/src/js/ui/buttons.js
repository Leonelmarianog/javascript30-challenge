import { calcPercentageOfTotal, clamp, getCoordinatesRelativeToParent } from '../utils/utils.js';

const $buttonsContainer = document.querySelector('#buttons');
const $tooltip = document.querySelector('#button-tooltip');
const $playBtn = document.querySelector('#play-btn');

export const togglePlayButtonIcon = () => {
  Array.from($playBtn.children).forEach((icon) => icon.classList.toggle('hidden'));
};

export const togglePlayButtonTitleFromVideoStatus = (isVideoPaused) => {
  const title = isVideoPaused ? 'Play (k)' : 'Pause (k)';
  $playBtn.setAttribute('data-title', title);
};

const updateButtonTooltipLeftCoord = (left) => {
  $tooltip.style.left = left;
};

export const displayButtonTooltip = () => {
  $tooltip.style.opacity = '1';
};

export const hideButtonTooltip = () => {
  $tooltip.style.opacity = '0';
};

export const updateTooltipTextContent = (string) => {
  $tooltip.textContent = string;
};

export const attachButtonTooltipToElement = (element) => {
  const elementRect = getCoordinatesRelativeToParent(element, $buttonsContainer);

  let newPosition = elementRect.left + element.offsetWidth / 2 - $tooltip.offsetWidth / 2;
  newPosition = clamp(newPosition, {
    min: 0,
    max: $buttonsContainer.offsetWidth - $tooltip.offsetWidth,
  });
  newPosition = calcPercentageOfTotal(newPosition, $buttonsContainer.offsetWidth);

  updateButtonTooltipLeftCoord(`${newPosition}%`);
};
