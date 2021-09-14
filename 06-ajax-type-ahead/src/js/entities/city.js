export class City {
  /**
   * @param {string} name
   * @param {string} state
   * @param {number} population
   * @param {number} latitude
   * @param {number} longitude
   */
  constructor(name, state, population, latitude, longitude) {
    this.name = name;
    this.state = state;
    this.population = population;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
