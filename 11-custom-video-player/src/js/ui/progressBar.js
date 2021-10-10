import { clamp, createTimeString, calcPercentageOfTotal } from '../utils/utils.js';
import noUiSlider from '../vendor/nouislider.js';

let $highlight = document.querySelector('#progress-highlight');
let $tooltip = document.querySelector('#progress-tooltip');
let $track = document.querySelector('#progress-track');
let $noUiConnects = null;
let $noUiHandle = null;
let progressBarApi = null;
let active = false;

/**
 * @param {string} width
 */
const updateHighlightWidth = (width) => {
  $highlight.style.width = width;
};

/**
 * @param {string} left
 */
const updateTooltipLeftCoordinate = (left) => {
  $tooltip.style.left = left;
};

/**
 * @param {string} string
 */
const updateTooltipTextContent = (string) => {
  $tooltip.textContent = string;
};

const displayTooltip = () => {
  $tooltip.style.opacity = '1';
};

export const animateScaleUp = () => {
  // TODO: Find a way to reduce these three reflows to a single one
  $track.style.transform = 'translate(-50%, 0) scaleY(1)';
  $noUiConnects.style.transform = 'scaleY(1)';
  $noUiHandle.style.transform = 'scale(1)';
};

export const animateScaleDown = () => {
  // TODO: Find a way to reduce these three reflows to a single one
  $track.style.transform = 'translate(-50%, 0) scaleY(0.5)';
  $noUiConnects.style.transform = 'scaleY(0.5)';
  $noUiHandle.style.transform = 'scale(0)';
};

/**
 * @param {number} timeInSeconds
 */
export const updateTooltip = (timeInSeconds) => {
  // TODO: Make the function smaller, maybe doing too much in one go?
  const videoDurationInSeconds = progressBarApi.options.range.max;
  const positionInPercentage = calcPercentageOfTotal(timeInSeconds, videoDurationInSeconds);
  const tooltipWidthInPercentage = calcPercentageOfTotal($tooltip.offsetWidth, $track.offsetWidth);
  const tooltipPositionInPercentage = positionInPercentage - tooltipWidthInPercentage / 2;
  const trackLowerBound = 0;
  const trackUpperBound = 100 - tooltipWidthInPercentage;
  const clampedTooltipPositionInPercentage = clamp(tooltipPositionInPercentage, {
    min: trackLowerBound,
    max: trackUpperBound,
  });
  const timeString = createTimeString(timeInSeconds);

  updateTooltipTextContent(timeString);
  updateTooltipLeftCoordinate(`${clampedTooltipPositionInPercentage}%`);
  displayTooltip();
};

export const hideTooltip = () => {
  $tooltip.style.opacity = '0';
};

/**
 * @param {number} timeInSeconds
 */
export const updateHighlight = (timeInSeconds) => {
  const videoDurationInSeconds = progressBarApi.options.range.max;
  const positionInPercentage = calcPercentageOfTotal(timeInSeconds, videoDurationInSeconds);

  updateHighlightWidth(`${positionInPercentage}%`);
};

export const hideHighlight = () => {
  $highlight.style.width = '0';
};

export const toggleActiveStatus = () => {
  active = !active;
};

/**
 * @returns {boolean}
 */
export const isActive = () => {
  return active;
};

/**
 * @param {number} timeInSeconds
 */
export const updateValue = (timeInSeconds) => {
  progressBarApi.set(timeInSeconds);
};

/**
 * @param {Object} options
 */
export const config = (options) => {
  progressBarApi.updateOptions(options);
};

/**
 * @param {HTMLElement} element
 * @param {Object} options
 * @returns {Object}
 */
export const initialize = (element, options) => {
  progressBarApi = noUiSlider.create(element, options);

  $highlight = document.querySelector('#progress-highlight');
  $tooltip = document.querySelector('#progress-tooltip');
  $track = document.querySelector('#progress-track');
  $noUiConnects = element.querySelector('.noUi-connects');
  $noUiHandle = element.querySelector('.noUi-handle');

  return progressBarApi;
};
