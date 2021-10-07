import { updateLengthTimestamp, updateTimeElapsedTimestamp } from './ui/general.js';
import {
  displayPlaybackHelper,
  displaySkipBackwardsHelper,
  displaySkipForwardsHelper,
  hideSkipBackwardsHelper,
  hideSkipForwardsHelper,
} from './ui/helpers.js';
import {
  createVideoElement,
  getVideoLength,
  getVideoTimeElapsed,
  skipVideoByAmount,
  toggleVideoPlayback,
  updateVideoCurrentTime,
  pauseVideo,
  playVideo,
  toggleVideoStatus,
  getVideoStatus,
  isVideoPaused,
  updateVideoVolume,
  getVideoVolume,
} from './ui/video.js';
import {
  calculateProgressOffsetX,
  updateProgressTooltipPosition,
  updateProgressTooltipTimestamp,
  updateProgressPosition,
  updateProgressHighlightPosition,
  updateProgressValue,
  updateProgressPositionFromAttributes,
  getProgressValue,
  setProgressMaxValue,
  setProgressValue,
  displayProgressThumb,
  displayProgressTooltip,
  hideProgressTooltip,
  hideProgressHighlight,
  hideProgressThumb,
  scaleDownProgressHeight,
  scaleUpProgressHeight,
} from './ui/progress.js';
import {
  attachButtonTooltipToElement,
  displayButtonTooltip,
  hideButtonTooltip,
  updateTooltipTextContent,
  togglePlayButtonIcon,
  togglePlayButtonTitleFromVideoStatus,
  updateVolumeButtonIcon,
} from './ui/buttons.js';
import { VideoStatus, KeyShortcuts } from './enums/index.js';
import { config as videoConfig } from './config/video.js';
import {
  calculateVolumeOffsetX,
  displayVolumeSlider,
  getVolumeValue,
  hideVolumeSlider,
  setVolumeMaxValue,
  setVolumeValue,
  updateVolumePosition,
  updateVolumePositionFromAttributes,
  updateVolumeValue,
} from './ui/volume.js';

/**
 * @param {Event} e
 */
const handleVideoLoad = (e) => {
  setProgressValue(e.target.currentTime);
  setProgressMaxValue(e.target.duration);
  setVolumeValue(e.target.volume);
  setVolumeMaxValue(e.target.volume);
  updateVolumePositionFromAttributes();
  updateProgressPositionFromAttributes();
  updateTimeElapsedTimestamp(getVideoTimeElapsed());
  updateLengthTimestamp(getVideoLength());
};

/**
 * @param {Event} e
 */
const handleVideoTimeUpdate = (e) => {
  setProgressValue(e.target.currentTime);
  updateProgressPositionFromAttributes();
  updateTimeElapsedTimestamp(getVideoTimeElapsed());
};

/**
 * @param {MouseEvent} e
 */
const handleVideoPlayback = (e) => {
  toggleVideoPlayback();
  updateTooltipTextContent(e.currentTarget.getAttribute('data-title'));
  attachButtonTooltipToElement(e.currentTarget);
  displayButtonTooltip();
};

const handleVideoEnd = () => {
  togglePlayButtonIcon();
};

const handleVideoClick = () => {
  toggleVideoPlayback();
  displayPlaybackHelper(isVideoPaused());
};

/**
 * @param {MouseEvent} e
 */
const handleSkipVideoByButton = (e) => {
  if (e.currentTarget.id === 'forwards-btn') {
    skipVideoByAmount(videoConfig.SKIP_AMOUNT_IN_SECONDS);
  }

  if (e.currentTarget.id === 'backwards-btn') {
    skipVideoByAmount(-videoConfig.SKIP_AMOUNT_IN_SECONDS);
  }
};

/**
 * @param {KeyboardEvent} e
 */
const handleSkipVideoByKey = (e) => {
  if (e.key === KeyShortcuts.ARROW_RIGHT) {
    hideSkipBackwardsHelper();
    displaySkipForwardsHelper(videoConfig.SKIP_AMOUNT_IN_SECONDS);
    skipVideoByAmount(videoConfig.SKIP_AMOUNT_IN_SECONDS);
  }

  if (e.key === KeyShortcuts.ARROW_LEFT) {
    hideSkipForwardsHelper();
    displaySkipBackwardsHelper(videoConfig.SKIP_AMOUNT_IN_SECONDS);
    skipVideoByAmount(-videoConfig.SKIP_AMOUNT_IN_SECONDS);
  }
};

/**
 * @param {MouseEvent} e
 */
const handleDocumentMouseMove = (e) => {
  const offsetX = calculateProgressOffsetX(e.pageX);
  displayProgressThumb();
  scaleUpProgressHeight();
  updateProgressPosition(offsetX);
  updateProgressValue(offsetX);
  updateVideoCurrentTime(getProgressValue());
  updateProgressTooltipTimestamp(offsetX);
  updateProgressTooltipPosition(offsetX);
  displayProgressTooltip();
};

/**
 * @param {MouseEvent} e
 */
const handleDocumentMouseUp = (e) => {
  if (getVideoStatus() === VideoStatus.PAUSED) {
    playVideo();
  }

  if (!e.target.closest('#progress')) {
    hideProgressThumb();
    scaleDownProgressHeight();
    hideProgressTooltip();
  }

  document.removeEventListener('mousemove', handleDocumentMouseMove);
  document.removeEventListener('mouseup', handleDocumentMouseUp);
};

/**
 * @param {MouseEvent} e
 */
const handleProgressBarMouseDown = (e) => {
  e.preventDefault();

  document.addEventListener('mousemove', handleDocumentMouseMove);
  document.addEventListener('mouseup', handleDocumentMouseUp);

  const offsetX = calculateProgressOffsetX(e.pageX);
  updateProgressPosition(offsetX);
  updateProgressValue(offsetX);
  updateVideoCurrentTime(getProgressValue());

  if (getVideoStatus() === VideoStatus.PLAYING) {
    pauseVideo();
  }
};

/**
 * @param {MouseEvent} e
 */
const handleProgressBarMouseOver = (e) => {
  const offsetX = calculateProgressOffsetX(e.pageX);
  displayProgressThumb();
  scaleUpProgressHeight();
  updateProgressHighlightPosition(offsetX);
  updateProgressTooltipTimestamp(offsetX);
  updateProgressTooltipPosition(offsetX);
  displayProgressTooltip();
};

/**
 * @param {MouseEvent} e
 */
const handleProgressBarMouseMove = (e) => {
  const offsetX = calculateProgressOffsetX(e.pageX);
  updateProgressHighlightPosition(offsetX);
  updateProgressTooltipTimestamp(offsetX);
  updateProgressTooltipPosition(offsetX);
};

const handleProgressBarMouseOut = () => {
  hideProgressThumb();
  scaleDownProgressHeight();
  hideProgressHighlight();
  hideProgressTooltip();
};

/**
 * @param {MouseEvent} e
 */
const handleButtonsMouseOver = (e) => {
  const $button = e.target.closest('button');

  if ($button) {
    updateTooltipTextContent($button.getAttribute('data-title'));
    attachButtonTooltipToElement($button);
    displayButtonTooltip();
  }
};

/**
 * @param {MouseEvent} e
 */
const handleButtonsMouseOut = (e) => {
  const $button = e.target.closest('button');

  if ($button) {
    hideButtonTooltip();
  }
};

const handleVolumeMouseDown = (e) => {
  e.preventDefault();

  document.addEventListener('mousemove', handleVolumeDocumentMouseMove);
  document.addEventListener('mouseup', handleVolumeDocumentMouseUp);

  updateVolumePosition(calculateVolumeOffsetX(e.pageX));
  updateVolumeValue(calculateVolumeOffsetX(e.pageX));
  updateVideoVolume(getVolumeValue());
};

const handleVolumeDocumentMouseMove = (e) => {
  updateVolumePosition(calculateVolumeOffsetX(e.pageX));
  updateVolumeValue(calculateVolumeOffsetX(e.pageX));
  updateVideoVolume(getVolumeValue());
  displayVolumeSlider();
};

const handleVolumeDocumentMouseUp = (e) => {
  if (!e.target.closest('#buttons-left')) {
    hideVolumeSlider();
  }

  document.removeEventListener('mousemove', handleVolumeDocumentMouseMove);
  document.removeEventListener('mouseup', handleVolumeDocumentMouseUp);
};

const handleVolumeChange = () => {
  updateVolumeButtonIcon(getVideoVolume());
};

const handleVideoPlay = (e) => {
  toggleVideoStatus();
  togglePlayButtonIcon();
  togglePlayButtonTitleFromVideoStatus(isVideoPaused());
};

const handleVideoPause = (e) => {
  toggleVideoStatus();
  togglePlayButtonIcon();
  togglePlayButtonTitleFromVideoStatus(isVideoPaused());
};

export const init = () => {
  const $videoPlayer = document.querySelector('#video-player');
  const $video = createVideoElement({
    id: 'video',
    className: 'player-screen',
    src: './src/media/652333414.mp4',
  });
  $videoPlayer.prepend($video);
  const $playBtn = document.querySelector('#play-btn');
  const $backwardsBtn = document.querySelector('#backwards-btn');
  const $forwardsBtn = document.querySelector('#forwards-btn');
  const $progressBar = document.querySelector('#progress');
  const $buttons = document.querySelector('#buttons');
  const $volumeControls = document.querySelector('#volume-controls');
  const $volumeContainer = document.querySelector('#volume-container');
  const $buttonsRight = document.querySelector('#buttons-right');
  const $buttonsLeft = document.querySelector('#buttons-left');
  const $volumeBtn = document.querySelector('#volume-btn');

  $video.addEventListener('loadedmetadata', handleVideoLoad);
  $video.addEventListener('timeupdate', handleVideoTimeUpdate);
  $video.addEventListener('ended', handleVideoEnd);
  $video.addEventListener('click', handleVideoClick);
  $video.addEventListener('volumechange', handleVolumeChange);
  $video.addEventListener('play', handleVideoPlay);
  $video.addEventListener('pause', handleVideoPause);

  $playBtn.addEventListener('click', handleVideoPlayback);
  $backwardsBtn.addEventListener('click', handleSkipVideoByButton);
  $forwardsBtn.addEventListener('click', handleSkipVideoByButton);
  document.addEventListener('keydown', handleSkipVideoByKey);

  $buttons.addEventListener('mouseover', handleButtonsMouseOver);
  $buttons.addEventListener('mouseout', handleButtonsMouseOut);

  $volumeContainer.addEventListener('mouseenter', displayVolumeSlider);
  $buttonsLeft.addEventListener('mouseleave', hideVolumeSlider);

  $volumeControls.addEventListener('mousedown', handleVolumeMouseDown);

  $progressBar.addEventListener('mousedown', handleProgressBarMouseDown);
  $progressBar.addEventListener('mouseover', handleProgressBarMouseOver);
  $progressBar.addEventListener('mousemove', handleProgressBarMouseMove);
  $progressBar.addEventListener('mouseout', handleProgressBarMouseOut);
};
