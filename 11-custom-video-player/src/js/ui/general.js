/**
 * @param {string} string
 */
export const updateLengthTimestamp = (string) => {
  const $lengthTimestamp = document.querySelector('#video-length-timestamp');
  $lengthTimestamp.textContent = string;
};

/**
 * @param {string} string
 */
export const updateTimeElapsedTimestamp = (string) => {
  const $timeElapsedTimestamp = document.querySelector('#time-elapsed-timestamp');
  $timeElapsedTimestamp.textContent = string;
};
