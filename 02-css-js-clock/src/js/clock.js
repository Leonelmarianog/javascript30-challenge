import { moveClockHands } from './ui/ui.js';
import { getHoursInDegrees, getMinutesInDegrees, getSecondsInDegrees } from './utils/utils.js';

const updateClock = () => {
    const currentDate = new Date();
    const hoursDegrees = getHoursInDegrees(currentDate);
    const minutesDegrees = getMinutesInDegrees(currentDate);
    const secondsDegrees = getSecondsInDegrees(currentDate);
    moveClockHands(hoursDegrees, minutesDegrees, secondsDegrees);
}

export const init = () => {
    setInterval(updateClock, 1000);
}
