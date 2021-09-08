const { defaults } = require('jest-config');

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  modulePathIgnorePatterns: ['fixtures'],
  coveragePathIgnorePatterns: ['fixtures'],
  testEnvironment: "jsdom"
};
