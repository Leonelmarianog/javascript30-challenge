import { calcPercentageOfTotal, clamp, getCoordinatesRelativeToParent } from '../utils/utils.js';

const $buttonsContainer = document.querySelector('#buttons');
const $tooltip = document.querySelector('#button-tooltip');
const $playBtn = document.querySelector('#play-btn');
const $volumeBtn = document.querySelector('#volume-btn');
const $volumeUpIcon = document.querySelector('#volume-up-icon');
const $volumeDownIcon = document.querySelector('#volume-down-icon');
const $volumeMuteIcon = document.querySelector('#volume-mute-icon');

export const updateVolumeButtonIcon = (volume) => {
  Array.from($volumeBtn.children).forEach((icon) => icon.classList.add('hidden'));

  if (volume > 0.5) {
    $volumeUpIcon.classList.remove('hidden');
    return;
  }

  if (volume > 0 && volume < 0.5) {
    $volumeDownIcon.classList.remove('hidden');
    return;
  }

  if (volume === 0) {
    $volumeMuteIcon.classList.remove('hidden');
    return;
  }
};

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
