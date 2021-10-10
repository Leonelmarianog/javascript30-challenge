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
import {
  animateScaleDown as animateProgressBarScaleDown,
  animateScaleUp as animateProgressBarScaleUp,
  config as configProgressBar,
  hideHighlight as hideProgressBarHighlight,
  hideTooltip as hideProgressBarTooltip,
  initialize as initializeProgressBar,
  isActive as isProgressBarActive,
  toggleActiveStatus as toggleProgressBarActiveStatus,
  updateHighlight as updateProgressBarHighlight,
  updateTooltip as updateProgressBarTooltip,
  updateValue as updateProgressBarValue,
} from './ui/progressBar.js';

/**
 * @param {Event} e
 */
const handleVideoLoad = (e) => {
  configProgressBar({
    range: {
      min: e.target.currentTime,
      max: e.target.duration,
    },
  });
  setVolumeValue(e.target.volume);
  setVolumeMaxValue(e.target.volume);
  updateVolumePositionFromAttributes();
  updateTimeElapsedTimestamp(getVideoTimeElapsed());
  updateLengthTimestamp(getVideoLength());
};

/**
 * @param {Event} e
 */
const handleVideoTimeUpdate = (e) => {
  updateProgressBarValue(e.target.currentTime);
  updateTimeElapsedTimestamp(getVideoTimeElapsed());
};

/**
 * @param {MouseEvent} e
 */
const handlePlayButtonClick = (e) => {
  toggleVideoPlayback();
  toggleVideoStatus();
  updateTooltipTextContent(e.currentTarget.getAttribute('data-title'));
  attachButtonTooltipToElement(e.currentTarget);
  displayButtonTooltip();
};

const handleVideoEnd = () => {
  togglePlayButtonIcon();
};

const handleVideoClick = () => {
  toggleVideoPlayback();
  toggleVideoStatus();
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

const handleVideoVolumeChange = () => {
  updateVolumeButtonIcon(getVideoVolume());
};

const handleVideoPlay = (e) => {
  togglePlayButtonIcon();
  togglePlayButtonTitleFromVideoStatus(isVideoPaused());
};

const handleVideoPause = (e) => {
  togglePlayButtonIcon();
  togglePlayButtonTitleFromVideoStatus(isVideoPaused());
};

const handleProgressBarMouseUp = (e) => {
  if (e.target.closest('#progress-controls')) {
    return;
  }

  hideProgressBarTooltip();
  animateProgressBarScaleDown();
  toggleProgressBarActiveStatus();

  document.removeEventListener('mouseup', handleProgressBarMouseUp);
};

const handleProgressBarStart = () => {
  toggleProgressBarActiveStatus();

  if (getVideoStatus() === VideoStatus.PLAYING) {
    pauseVideo();
  }

  document.addEventListener('mouseup', handleProgressBarMouseUp);
};

const handleProgressBarSlide = ([value]) => {
  hideProgressBarHighlight();
  updateVideoCurrentTime(value);
  updateProgressBarTooltip(value);
};

const handleProgressBarHover = (value) => {
  updateProgressBarHighlight(value);
  updateProgressBarTooltip(value);
  animateProgressBarScaleUp();
};

const handleProgressBarEnd = () => {
  if (getVideoStatus() === VideoStatus.PLAYING) {
    playVideo();
  }
};

const handleProgressBarMouseOut = () => {
  if (isProgressBarActive()) {
    return;
  }

  hideProgressBarHighlight();
  animateProgressBarScaleDown();
  hideProgressBarTooltip();
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
  const $buttons = document.querySelector('#buttons');
  const $volumeControls = document.querySelector('#volume-controls');
  const $volumeContainer = document.querySelector('#volume-container');
  const $buttonsRight = document.querySelector('#buttons-right');
  const $buttonsLeft = document.querySelector('#buttons-left');
  const $volumeBtn = document.querySelector('#volume-btn');

  const $progressControls = document.querySelector('#progress-controls');
  const $progressBar = document.querySelector('#progress-bar');
  const progressBarApi = initializeProgressBar($progressBar, {
    start: 0,
    connect: 'lower',
    behaviour: 'snap-hover',
    animate: false, // fixes hover event not firing inmmediately after slide + updating value - TODO: look at noUiSlider source code and find out what why this fixes it
    range: {
      min: 0,
      max: 100,
    },
  });

  progressBarApi.on('start', handleProgressBarStart);
  progressBarApi.on('slide', handleProgressBarSlide);
  progressBarApi.on('hover', handleProgressBarHover);
  progressBarApi.on('end', handleProgressBarEnd);
  $progressControls.addEventListener('mouseleave', handleProgressBarMouseOut);

  $video.addEventListener('loadedmetadata', handleVideoLoad);
  $video.addEventListener('timeupdate', handleVideoTimeUpdate);
  $video.addEventListener('ended', handleVideoEnd);
  $video.addEventListener('click', handleVideoClick);
  $video.addEventListener('volumechange', handleVideoVolumeChange);
  $video.addEventListener('play', handleVideoPlay);
  $video.addEventListener('pause', handleVideoPause);

  $playBtn.addEventListener('click', handlePlayButtonClick);
  $backwardsBtn.addEventListener('click', handleSkipVideoByButton);
  $forwardsBtn.addEventListener('click', handleSkipVideoByButton);
  document.addEventListener('keydown', handleSkipVideoByKey);

  $buttons.addEventListener('mouseover', handleButtonsMouseOver);
  $buttons.addEventListener('mouseout', handleButtonsMouseOut);

  $volumeContainer.addEventListener('mouseenter', displayVolumeSlider);
  $buttonsLeft.addEventListener('mouseleave', hideVolumeSlider);

  $volumeControls.addEventListener('mousedown', handleVolumeMouseDown);
};
