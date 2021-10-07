import getData from './modules/fetch.js';
import format from './modules/format.js';
import createTable from './modules/table.js';
import createInput from './modules/input.js';
import formatInput from './modules/formatInput.js';

let currentLat;
let currentLon;

createInput(document.body);

document.addEventListener('submit', event => {
  event.preventDefault();
  let formInput = new FormData(event.target);
  const { lat, lon } = formatInput(formInput);
  if (lat && lon) {
    // This check is required in order not to send the request if input is the same
    if (currentLat !== lat || currentLon !== lon) {
      getData('https://api.met.no/weatherapi/locationforecast/2.0/compact', { lat, lon })
        .then(data => {
          let currentTable = document.getElementById('weatherTable');
          if (currentTable) currentTable.remove();
          const formattedData = format(data);
          createTable('weatherTable', document.body, formattedData);
          currentLat = lat;
          currentLon = lon;
        })
        .catch(err => {
          console.error(err);
        })
    }
  } else {
    console.error('No input provided');
  }
});
