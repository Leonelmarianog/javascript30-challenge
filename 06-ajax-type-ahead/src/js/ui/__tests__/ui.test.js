import {
  createDatalistInnerHtml,
  displayDatalistInnerHtml,
  clearDatalistInnerHtml,
} from '../ui.js';
import { body } from './fixtures/body.js';
import { datalist } from './fixtures/datalist.js';

beforeAll(() => {
  document.body.innerHTML = body;
});

describe('clearDatalistInnerHtml', () => {
  it('clears the datalist inner html', () => {
    const $datalist = document.querySelector('#datalist');
    $datalist.innerHTML = datalist;

    clearDatalistInnerHtml();

    expect($datalist.innerHTML).toBe('');
  });
});

describe('displayDatalistInnerHtml', () => {
  it('adds inner html to the datalist', () => {
    const $datalist = document.querySelector('#datalist');
    $datalist.innerHTML = '';

    displayDatalistInnerHtml(datalist);

    expect($datalist.innerHTML).toBe(datalist);
  });
});

describe('createDatalistInnerHtml', () => {
  describe('when passing an input and a cities array', () => {
    it('creates the datalist inner html', () => {
      const userInput = 'new york';
      const cities = [{ name: 'new york', state: 'new york' }];

      const DatalistInnerHtml = createDatalistInnerHtml(userInput, cities);

      expect(DatalistInnerHtml).toBe(datalist);
    });
  });
});
