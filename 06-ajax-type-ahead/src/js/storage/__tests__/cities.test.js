import { saveCitiesInStorage, getCitiesFromStorage } from '../cities.js';
import { City } from '../../entities/city.js';

describe('saveCitiesInStorage', () => {
  describe('when passing an array of cities as argument', () => {
    it('should save the array of cities in localStorage', () => {
      const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
      const citiesMock = [new City(), new City()];

      saveCitiesInStorage(citiesMock);

      expect(setItemSpy).toHaveBeenCalledTimes(1);
      expect(setItemSpy).toHaveBeenCalledWith('cities', JSON.stringify(citiesMock));
    });
  });

  describe('when no array of cities is passed as argument', () => {
    it('should throw an error', () => {
      const attemptSaveCitiesInStorage = () => {
        saveCitiesInStorage();
      };

      expect(attemptSaveCitiesInStorage).toThrowError(expect.any(Error));
    });
  });
});

describe('getCitiesFromStorage', () => {
  describe('If the user has cities stored in localStorage when the function is called', () => {
    it('should return an array of cities', () => {
      const citiesMock = JSON.stringify([new City(), new City()]);
      const getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(citiesMock);

      const citiesData = getCitiesFromStorage();

      expect(citiesData).toEqual(JSON.parse(citiesMock));
    });
  });

  describe('If the user does not have cities stored in localStorage when the function is called', () => {
    it('should thrown an error', () => {
      const getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null);

      const attemptGetCitiesFromStorage = () => {
        getCitiesFromStorage();
      };

      expect(attemptGetCitiesFromStorage).toThrowError(expect.any(Error));
    });
  });
});
