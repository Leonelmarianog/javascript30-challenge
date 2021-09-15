import { getCities } from '../cities.js';
import { getCitiesFromApi } from '../../api/cities.js';
import { getCitiesFromStorage, saveCitiesInStorage } from '../../storage/cities.js';
import { fromApiToCity, fromStorageToCity } from '../../mappers/cities.js';
import { City } from '../../entities/city.js';
import { apiData, storageData } from './fixtures/data.js';

const citiesMock = apiData.map((city) => fromApiToCity(city));

jest.mock('../../storage/cities.js');
jest.mock('../../api/cities.js');

afterEach(() => {
  jest.clearAllMocks();
});

describe('getCities', () => {
  describe('if there are no cities stored in localStorage', () => {
    it('should get them from the api', async () => {
      getCitiesFromStorage.mockImplementationOnce(() => {
        throw new Error();
      });
      getCitiesFromApi.mockResolvedValueOnce(apiData);

      const cities = await getCities();

      expect(getCitiesFromStorage).toHaveBeenCalledTimes(1);
      expect(getCitiesFromApi).toHaveBeenCalledTimes(1);
      expect(saveCitiesInStorage).toHaveBeenCalledTimes(1);
      expect(saveCitiesInStorage).toHaveBeenCalledWith(expect.any(Array));
      expect(Array.isArray(cities)).toBe(true);
      expect(cities.filter((city) => city instanceof City).length).toBe(apiData.length);
    });
  });

  describe('if there are cities stored in localStorage', () => {
    it('should get them from localStorage', async () => {
      getCitiesFromStorage.mockReturnValueOnce(storageData);

      const cities = await getCities();

      expect(getCitiesFromStorage).toHaveBeenCalledTimes(1);
      expect(getCitiesFromApi).not.toHaveBeenCalled();
      expect(saveCitiesInStorage).not.toHaveBeenCalled();
      expect(Array.isArray(cities)).toBe(true);
      expect(cities.filter((city) => city instanceof City).length).toBe(storageData.length);
    });
  });
});
