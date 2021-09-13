import { toggleElementClass } from './ui/ui.js';

/**
 * @param {Event} e
 */
const handleOpen = (e) => {
  const $panel = e.target.closest('[data-target="panel"]');

  if (!$panel) {
    return false;
  }

  toggleElementClass($panel, 'open');
};

export const init = () => {
  const $panelsContainer = document.querySelector('#panels');
  $panelsContainer.addEventListener('click', handleOpen);
};
