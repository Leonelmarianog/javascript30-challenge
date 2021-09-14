import { fetchData } from '../utils/fetch.js';

const url =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

/**
 * @returns {Promise<Object<string, string>>}
 */
export const getCitiesFromApi = async () => {
  const citiesData = await fetchData(url);

  if (!citiesData) {
    throw new Error(`No results from fetching : ${url}.`);
  }

  return citiesData;
};
