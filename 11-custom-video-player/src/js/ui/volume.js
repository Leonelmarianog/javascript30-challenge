import { calcPercentageOfTotal, clamp } from '../utils/utils.js';

const $volume = document.querySelector('#volume');
const $fill = document.querySelector('#volume-fill');
const $thumb = document.querySelector('#volume-thumb');

const updateVolumeFillWidth = (width) => {
  $fill.style.width = width;
};

const updateVolumeThumbLeftCoord = (left) => {
  $thumb.style.left = left;
};

export const displayVolumeSlider = () => {
  document.documentElement.style.setProperty(
    '--volume-controls-width',
    'var(--volume-slider-width)'
  );
};

export const hideVolumeSlider = () => {
  document.documentElement.style.setProperty('--volume-controls-width', 0);
};

export const calculateVolumeOffsetX = (pageX) => {
  return pageX - $volume.getBoundingClientRect().left;
};

const calculateVolumeValueFromPosition = (position) => {
  return (position / $volume.offsetWidth) * $volume.getAttribute('data-max');
};

export const setVolumeValue = (value) => {
  $volume.setAttribute('data-value', value);
};

export const getVolumeValue = () => {
  return $volume.getAttribute('data-value');
};

export const setVolumeMaxValue = (max) => {
  $volume.setAttribute('data-max', max);
};

export const updateVolumePosition = (offsetX) => {
  const newPosition = clamp(offsetX, {
    min: $thumb.offsetWidth / 2,
    max: $volume.offsetWidth - $thumb.offsetWidth / 2,
  });
  const fillWidth = calcPercentageOfTotal(newPosition, $volume.offsetWidth);
  const thumbLeftCoord = calcPercentageOfTotal(
    newPosition - $thumb.offsetWidth / 2,
    $volume.offsetWidth
  );

  updateVolumeFillWidth(`${fillWidth}%`);
  updateVolumeThumbLeftCoord(`${thumbLeftCoord}%`);
};

export const updateVolumeValue = (offsetX) => {
  const newPosition = clamp(offsetX, { min: 0, max: $volume.offsetWidth });
  const newValue = calculateVolumeValueFromPosition(newPosition);
  $volume.setAttribute('data-value', newValue);
};

export const updateVolumePositionFromAttributes = () => {
  const value = $volume.getAttribute('data-value');
  const max = $volume.getAttribute('data-max');
  const fillWidth = calcPercentageOfTotal(value, max);
  const thumbWidth = calcPercentageOfTotal($thumb.offsetWidth, $volume.offsetWidth);
  const thumbLeftCoord = fillWidth - thumbWidth;

  updateVolumeFillWidth(`${fillWidth}%`);
  updateVolumeThumbLeftCoord(`${thumbLeftCoord}%`);
};
