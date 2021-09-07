import { playSoundByName } from '../utils/utils.js';

/**
 * @param {KeyboardEvent} e 
 */
export const toggleKeyClass = (e) => {
    const { key: keyName, type: eventType } = e;
    const $keyElement = document.querySelector(`[data-keyname="${keyName.toUpperCase()}"]`);

    if(!$keyElement) {
        return false;
    }

    if(eventType === 'keydown') {
        $keyElement.classList.add('active');
    }
    
    if (eventType === 'keyup') {
        $keyElement.classList.remove('active');
    }
};

/**
 * @param {KeyboardEvent | Event} e 
 */
export const playKeySound = (e) => {
    const { key: keyName, type: eventType, target: eventTarget } = e;
    let $keyElement;

    if(eventType === 'keydown') {
        $keyElement = document.querySelector(`[data-keyname="${keyName.toUpperCase()}"]`);
    }

    if(eventType === 'click') {
        $keyElement = eventTarget.closest('.key');
    }

    if(!$keyElement) {
        return false;
    }

    const soundName = $keyElement.getAttribute('data-sound');

    playSoundByName(soundName);
}
