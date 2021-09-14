import { City } from '../entities/city.js';

/**
 * @param {City[]} cities
 */
export const saveCitiesInStorage = (cities) => {
  if (!cities) {
    throw new Error('No cities to store, please provide cities to store them.');
  }

  localStorage.setItem('cities', JSON.stringify(cities));
};

/**
 * @returns {City[]}
 */
export const getCitiesFromStorage = () => {
  const cities = JSON.parse(localStorage.getItem('cities'));

  if (!cities) {
    throw new Error('No cities stored.');
  }

  return cities;
};
