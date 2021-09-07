import { toggleKeyClass, playKeySound } from './ui/ui.js';

export const init = () => {
    const $keys = document.querySelector('.keys');

    $keys.addEventListener('click', playKeySound);
    document.addEventListener('keydown', playKeySound);
    document.addEventListener('keydown', toggleKeyClass);
    document.addEventListener('keyup', toggleKeyClass);
}