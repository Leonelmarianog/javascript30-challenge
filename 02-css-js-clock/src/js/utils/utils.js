/**
 * @param {Date} date 
 * @returns {Number}
 */
export const getHoursInDegrees = (date) => {
    const hour = date.getHours();
    const mins = date.getMinutes();
    const hoursDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) - 180;
    return hoursDegrees;
}

/**
 * @param {Date} date 
 * @returns {Number}
 */
export const getMinutesInDegrees = (date) => {
    const mins = date.getMinutes();
    const seconds = date.getSeconds();
    const minutesDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) - 180;
    return minutesDegrees;
}

/**
 * @param {Date} date 
 * @returns {Number}
 */
export const getSecondsInDegrees = (date) => {
    const seconds = date.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) - 180;
    return secondsDegrees;
}
