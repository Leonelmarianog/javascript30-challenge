import { VideoStatus } from '../enums/videoStatus.js';
import {
  fromSecondsToHoursMinutesSeconds,
  formatTime,
  createTimestampString,
} from '../utils/utils.js';

/**
 * @type {HTMLVideoElement}
 */
let $video = null;

/**
 * @param {Object<string, string>} obj
 */
export const createVideoElement = ({ id, className, src }) => {
  $video = document.createElement('video');
  $video.id = id;
  $video.className = className;
  $video.src = src;

  return $video;
};

export const playVideo = () => {
  return $video.play();
};

export const pauseVideo = () => {
  return $video.pause();
};

export const getVideoVolume = () => {
  return Number($video.volume);
};

export const updateVideoVolume = (volume) => {
  $video.volume = volume;
};

export const toggleVideoPlayback = () => {
  return $video.paused ? $video.play() : $video.pause();
};

export const toggleVideoStatus = () => {
  $video.paused
    ? $video.setAttribute('data-status', VideoStatus.PLAYING)
    : $video.setAttribute('data-status', VideoStatus.PAUSED);
};

export const getVideoStatus = () => {
  return $video.getAttribute('data-status');
};

export const isVideoPaused = () => {
  return $video.paused;
};

/**
 * @param {number} timeInSeconds
 */
export const skipVideoByAmount = (timeInSeconds) => {
  $video.currentTime = $video.currentTime + timeInSeconds;
};

/**
 * @param {number} timeInSeconds
 */
export const updateVideoCurrentTime = (timeInSeconds) => {
  $video.currentTime = timeInSeconds;
};

export const getVideoTimeElapsed = () => {
  const timeElapsedInSeconds = $video.currentTime;
  let timeElapsed = fromSecondsToHoursMinutesSeconds(timeElapsedInSeconds);
  timeElapsed = formatTime(timeElapsed);

  return createTimestampString(timeElapsed);
};

export const getVideoLength = () => {
  const lengthInSeconds = $video.duration;
  let length = fromSecondsToHoursMinutesSeconds(lengthInSeconds);
  length = formatTime(length);

  return createTimestampString(length);
};
