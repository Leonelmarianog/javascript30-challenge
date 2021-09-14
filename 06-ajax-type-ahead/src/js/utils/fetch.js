/**
 * @param {String} url
 * @returns {Object}
 */
export const fetchData = async (url) => {
  if (!url) {
    throw new Error('Missing url parameter.');
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Response from external url failed with status ${response.status}: ${response.statusText}.`
    );
  }

  const data = await response.json();
  return data;
};
