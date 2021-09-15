import { getCitiesFromApi } from '../cities.js';
import { fetchData } from '../../utils/fetch.js';

jest.mock('../../utils/fetch.js');

describe('getCitiesFromApi', () => {
  describe('when there are results', () => {
    it('should return the results', async () => {
      const mockCities = { name: 'new york' };

      fetchData.mockReturnValueOnce(mockCities);

      const citiesData = await getCitiesFromApi();

      expect(citiesData).toBe(mockCities);
    });
  });

  describe('when there are no results', () => {
    it('should thrown an error', async () => {
      fetchData.mockReturnValueOnce(null);

      const attemptToGetCities = async () => {
        await getCitiesFromApi();
      };

      await expect(attemptToGetCities).rejects.toThrowError(expect.any(Error));
    });
  });
});
