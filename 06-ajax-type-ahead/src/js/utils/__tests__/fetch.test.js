import { fetchData } from '../fetch.js';

beforeAll(() => {
  window.fetch = jest.fn();
});

describe('fetchData', () => {
  describe('When passed a valid url as argument', () => {
    it('should return data from the url if fetching was successful', async () => {
      const mockData = { a: 1, b: 2 };
      const mockResponse = {
        ok: true,
        json: jest.fn().mockReturnValueOnce(mockData),
      };
      window.fetch.mockResolvedValueOnce(mockResponse);

      const data = await fetchData('some-url-to-some-website');

      expect(data).toBe(mockData);
    });

    it('should throw an error if fetching fails', async () => {
      const mockResponse = {
        ok: false,
      };
      window.fetch.mockResolvedValueOnce(mockResponse);

      const attemptFetchData = async () => {
        await fetchData('some-url-to-some-website');
      };

      await expect(attemptFetchData).rejects.toThrowError(expect.any(Error));
    });
  });

  describe('when no url is passed as argument', () => {
    it('should throw an error', async () => {
      const attemptFetchData = async () => {
        await fetchData();
      };

      await expect(attemptFetchData).rejects.toThrowError(expect.any(Error));
    });
  });
});
