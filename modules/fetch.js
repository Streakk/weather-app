/**
 * Calls the url and returns response.
 * @param {string} url - Url to which the request needs to be done.
 * @param {object} params - Object containing query params for GET request.
 * @returns {promise} Returns a promise.
 */
export default async function getData(url, params) {
  let finalUrl = new URL(url);
  finalUrl.search = new URLSearchParams(params).toString();
  try {
    const response = await fetch(finalUrl, {
      method: 'GET',
    })
    return response.json();
  } catch (err) {
    console.error('There has been an error with the request', err);
  }
}