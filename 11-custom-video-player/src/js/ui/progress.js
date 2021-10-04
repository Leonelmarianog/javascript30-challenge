import {
  calcPercentageOfTotal,
  clamp,
  createTimestampString,
  formatTime,
  fromSecondsToHoursMinutesSeconds,
} from '../utils/utils.js';

const $progress = document.querySelector('#progress');
const $track = document.querySelector('#progress-track');
const $highlight = document.querySelector('#progress-highlight');
const $fill = document.querySelector('#progress-fill');
const $thumb = document.querySelector('#progress-thumb');
const $tooltip = document.querySelector('#progress-tooltip');

export const displayProgressThumb = () => {
  $thumb.style.transform = 'scale(1)';
};

export const hideProgressThumb = () => {
  $thumb.style.transform = 'scale(0)';
};

export const scaleUpProgressHeight = () => {
  $track.style.transform = 'scaleY(1.75)';
  $fill.style.transform = 'scaleY(1.75)';
  $highlight.style.transform = 'scaleY(1.75)';
};

export const scaleDownProgressHeight = () => {
  $track.style.transform = 'scaleY(1)';
  $fill.style.transform = 'scaleY(1)';
  $highlight.style.transform = 'scaleY(1)';
};

const updateProgressFillWidth = (width) => {
  $fill.style.width = width;
};

const updateProgressThumbLeftCoord = (left) => {
  $thumb.style.left = left;
};

const updateProgressHighlightWidth = (width) => {
  $highlight.style.width = width;
};

export const hideProgressHighlight = () => {
  $highlight.style.width = '0%';
};

const updateProgressTooltipLeftCoord = (left) => {
  $tooltip.style.left = left;
};

const updateProgressTooltipTextContent = (text) => {
  $tooltip.textContent = text;
};

export const displayProgressTooltip = () => {
  $tooltip.style.opacity = '1';
};

export const hideProgressTooltip = () => {
  $tooltip.style.opacity = '0';
};

export const calculateProgressOffsetX = (pageX) => {
  return pageX - $progress.getBoundingClientRect().left;
};

const calculateProgressValueFromPosition = (position) => {
  return (position / $progress.offsetWidth) * $progress.getAttribute('data-max');
};

export const setProgressValue = (value) => {
  $progress.setAttribute('data-value', value);
};

export const getProgressValue = () => {
  return $progress.getAttribute('data-value');
};

export const setProgressMaxValue = (max) => {
  $progress.setAttribute('data-max', max);
};

export const updateProgressPosition = (offsetX) => {
  const newPosition = clamp(offsetX, { min: 0, max: $progress.offsetWidth });
  const fillWidth = calcPercentageOfTotal(newPosition, $progress.offsetWidth);
  const thumbLeftCoord = calcPercentageOfTotal(
    newPosition - $thumb.offsetWidth / 2,
    $progress.offsetWidth
  );

  updateProgressFillWidth(`${fillWidth}%`);
  updateProgressThumbLeftCoord(`${thumbLeftCoord}%`);
};

export const updateProgressValue = (offsetX) => {
  const newPosition = clamp(offsetX, { min: 0, max: $progress.offsetWidth });
  const newValue = calculateProgressValueFromPosition(newPosition);
  $progress.setAttribute('data-value', newValue);
};

export const updateProgressPositionFromAttributes = () => {
  const value = $progress.getAttribute('data-value');
  const max = $progress.getAttribute('data-max');
  const fillWidth = calcPercentageOfTotal(value, max);
  const thumbWidth = calcPercentageOfTotal($thumb.offsetWidth, $progress.offsetWidth);
  const thumbLeftCoord = fillWidth - thumbWidth / 2;

  updateProgressFillWidth(`${fillWidth}%`);
  updateProgressThumbLeftCoord(`${thumbLeftCoord}%`);
};

export const updateProgressHighlightPosition = (offsetX) => {
  const newPosition = clamp(offsetX, { min: 0, max: $progress.offsetWidth });
  const highligthWidth = calcPercentageOfTotal(newPosition, $progress.offsetWidth);

  updateProgressHighlightWidth(`${highligthWidth}%`);
};

export const updateProgressTooltipTimestamp = (offsetX) => {
  const newPosition = clamp(offsetX, { min: 0, max: $progress.offsetWidth });
  const value = calculateProgressValueFromPosition(newPosition);
  let time = fromSecondsToHoursMinutesSeconds(value);
  time = formatTime(time);
  time = createTimestampString(time);

  updateProgressTooltipTextContent(time);
};

export const updateProgressTooltipPosition = (offsetX) => {
  const newPosition = clamp(offsetX, {
    min: $tooltip.offsetWidth / 2,
    max: $progress.offsetWidth - $tooltip.offsetWidth / 2,
  });
  const tooltipLeftCoord = calcPercentageOfTotal(
    newPosition - $tooltip.offsetWidth / 2,
    $progress.offsetWidth
  );

  updateProgressTooltipLeftCoord(`${tooltipLeftCoord}%`);
};
