/**
 * Formats input from form data .
 * @param {object} input - Form data object from HTMLFormElement.
 * @returns {object} Returns an object with lat and lon float values.
 */
export default function formatInput(input) {
  let valuesArr = [];
  for (let value of input.values()) {
    valuesArr.push(value);
  }
  let lat = valuesArr[0];
  let lon = valuesArr[1];
  lat = parseFloat(lat);
  lon = parseFloat(lon);

  return {
    lat,
    lon
  }
}