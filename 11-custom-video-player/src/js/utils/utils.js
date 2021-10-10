export const getCoordinatesRelativeToParent = (child, parent) => {
  const childRect = child.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  return {
    top: childRect.top - parentRect.top,
    right: childRect.right - parentRect.right,
    bottom: childRect.bottom - parentRect.bottom,
    left: childRect.left - parentRect.left,
  };
};

export const calcPercentageOfTotal = (value, total) => {
  return (value / total) * 100;
};

export const clamp = (value, { min, max }) => {
  return value < min ? min : value > max ? max : value;
};

export const fromSecondsToHoursMinutesSeconds = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor((timeInSeconds % 3600) % 60);

  return { hours, minutes, seconds };
};

export const formatTime = ({ hours: hrs, minutes: mins, seconds: secs }) => {
  const hours = hrs !== 0 ? hrs : '';
  const minutes = mins > 9 ? mins : `0${mins}`;
  const seconds = secs > 9 ? secs : `0${secs}`;

  return { hours, minutes, seconds };
};

export const createTimestampString = ({ hours, minutes, seconds }) => {
  return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};

export const createTimeString = (timeInSeconds) => {
  const timeInHoursMinutesSeconds = fromSecondsToHoursMinutesSeconds(timeInSeconds);
  const { hours, minutes, seconds } = formatTime(timeInHoursMinutesSeconds);

  return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};
