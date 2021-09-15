import { City } from './entities/city.js';
import { getCities } from './services/cities.js';
import {
  clearDatalistInnerHtml,
  createDatalistInnerHtml,
  displayDatalistInnerHtml,
} from './ui/ui.js';

/**
 * @param {string} input
 * @param {City[]} cities
 * @returns {City[]}
 */
const findCityMatches = (input, cities) => {
  const regexp = new RegExp(input, 'gi');
  const cityMatches = cities.filter((city) => city.name.match(regexp) || city.state.match(regexp));
  return cityMatches;
};

/**
 * @param {Event} e
 */
const handleInput = async (e) => {
  const {
    target: { value: inputValue },
  } = e;

  if (inputValue === '') {
    clearDatalistInnerHtml();
    return false;
  }

  clearDatalistInnerHtml();

  const cities = await getCities();
  const cityMatches = findCityMatches(inputValue, cities);
  const dataListContent = createDatalistInnerHtml(inputValue, cityMatches);
  displayDatalistInnerHtml(dataListContent);
};

/**
 * @param {Event} e
 */
const onInput = (e) => {
  handleInput(e).catch((err) => console.error(err));
};

export const init = () => {
  document.querySelector('input').addEventListener('input', onInput);
};
