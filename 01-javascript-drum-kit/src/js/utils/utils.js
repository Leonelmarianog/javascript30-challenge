/**
 * @param {String} name 
 */
export const playSoundByName = (name) => {
    const audio = new Audio(`src/sounds/${name}.wav`);
    return audio.play();
}
