/**
 * @param {Number} hoursDegrees 
 * @param {Number} minutesDegrees 
 * @param {Number} secondsDegrees 
 */
export const moveClockHands = (hoursDegrees, minutesDegrees, secondsDegrees) => {
    document.querySelector('.hours-hand').style.transform = `rotate(${hoursDegrees}deg)`;
    document.querySelector('.minutes-hand').style.transform = `rotate(${minutesDegrees}deg)`;
    document.querySelector('.seconds-hand').style.transform = `rotate(${secondsDegrees}deg)`;
}
