import { City } from '../../entities/city.js';
import { fromApiToCity, fromStorageToCity } from '../cities.js';

describe('fromApiToCity', () => {
  it('should map raw data into a City entity', () => {
    const data = {
      city: 'New York',
      growth_from_2000_to_2013: '4.8%',
      latitude: 40.7127837,
      longitude: -74.0059413,
      population: '8405837',
      rank: '1',
      state: 'New York',
    };

    const city = fromApiToCity(data);

    expect(city instanceof City).toBe(true);
    expect(city.name).toBeDefined();
    expect(city.state).toBeDefined();
    expect(city.population).toBeDefined();
    expect(city.latitude).toBeDefined();
    expect(city.longitude).toBeDefined();
  });
});

describe('fromStorageToCity', () => {
  it('should map raw data into a City entity', () => {
    const data = {
      name: 'New York',
      state: 'New York',
      population: 8405837,
      latitude: 40.7127837,
      longitude: -74.0059413,
    };

    const city = fromStorageToCity(data);

    expect(city instanceof City).toBe(true);
    expect(city.name).toBeDefined();
    expect(city.state).toBeDefined();
    expect(city.population).toBeDefined();
    expect(city.latitude).toBeDefined();
    expect(city.longitude).toBeDefined();
  });
});
