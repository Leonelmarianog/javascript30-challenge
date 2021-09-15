import { City } from '../entities/city.js';

/**
 * @param {Object<string, string>} data
 * @returns {City}
 */
export const fromApiToCity = (data) => {
  const { city: name, latitude, longitude, population, state } = data;

  return new City(name, state, Number(population), Number(latitude), Number(longitude));
};

/**
 * @param {Object<string, string>} data
 * @returns {City}
 */
export const fromStorageToCity = (data) => {
  const { name, latitude, longitude, population, state } = data;

  return new City(name, state, Number(population), Number(latitude), Number(longitude));
};
