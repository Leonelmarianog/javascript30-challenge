import { getCitiesFromApi } from '../api/cities.js';
import { getCitiesFromStorage, saveCitiesInStorage } from '../storage/cities.js';
import { fromApiToCity, fromStorageToCity } from '../mappers/cities.js';
import { City } from '../entities/city.js';

/**
 * @returns {City[]}
 */
export const getCities = async () => {
  try {
    const citiesData = getCitiesFromStorage();
    const cities = citiesData.map((cityData) => fromStorageToCity(cityData));
    return cities;
  } catch (error) {
    const citiesData = await getCitiesFromApi();
    const cities = citiesData.map((cityData) => fromApiToCity(cityData));
    saveCitiesInStorage(cities);
    return cities;
  }
};
