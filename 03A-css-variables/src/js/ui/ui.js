/**
 * @param {Number} number
 * @param {HTMLElement} element
 */
export const setSpacing = (number, element) => {
  let border = element.style.border ? element.style.border : '0px solid #000';
  const afterIndex = border.split(' ').slice(1);
  const beforeIndex = [`${number}px`];
  border = beforeIndex.concat(afterIndex).join(' ');
  element.style.border = border;
};

/**
 * @param {Number} number
 * @param {HTMLElement} element
 */
export const setBlur = (number, element) => {
  element.style.filter = `blur(${number}px)`;
};

/**
 * @param {String} color
 * @param {HTMLElement} element
 */
export const setColor = (color, element) => {
  let border = element.style.border ? element.style.border : '0px solid black';
  border = border.split(' ').slice(0, 2).concat(color).join(' ');
  element.style.border = border;
};
