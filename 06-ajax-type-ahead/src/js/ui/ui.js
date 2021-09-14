import { City } from '../entities/city.js';

/**
 * @param {string} input
 * @param {City[]} cities
 * @returns {string}
 */
export const createDatalistInnerHtml = (input, cities) => {
  const regexp = new RegExp(input, 'gi');

  const datalistInnerHtml = cities
    .map((city) => {
      const cityName = city.name.replace(regexp, `<strong>${input}</strong>`);
      const stateName = city.state.replace(regexp, `<strong>${input}</strong>`);

      return `<li>${cityName}, ${stateName}</li>`;
    })
    .join('');

  return datalistInnerHtml;
};

/**
 * @param {string} innerHtml
 */
export const displayDatalistInnerHtml = (innerHtml) => {
  document.querySelector('#datalist').innerHTML = innerHtml;
};

export const clearDatalistInnerHtml = () => {
  document.querySelector('#datalist').innerHTML = '';
};
