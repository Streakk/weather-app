/**
 * Creates input element and populates it with static data .
 * @param {object} parent - Document body element.
 * @returns {void}
 */
export default function createInput(parent) {
  let divWrapper = document.createElement('div');
  let form = document.createElement('form');
  let inputLat = document.createElement('input');
  let inputLon = document.createElement('input');
  let inputSubmit = document.createElement('input');
  let latLabel = document.createElement('label');
  let lonLabel = document.createElement('label');

  inputSubmit.setAttribute('type', 'submit');
  inputLat.setAttribute('type', 'text');
  inputLat.setAttribute('name', 'latitude');
  inputLon.setAttribute('type', 'text');
  inputLon.setAttribute('name', 'longtitude');
  latLabel.setAttribute('for', 'latitude');
  lonLabel.setAttribute('for', 'longtitude');
  latLabel.innerHTML = 'Latitude: ';
  lonLabel.innerHTML = 'Longtitue: ';

  form.appendChild(latLabel);
  form.appendChild(inputLat);
  form.appendChild(lonLabel);
  form.appendChild(inputLon);
  form.appendChild(inputSubmit);
  parent.appendChild(divWrapper);
  divWrapper.appendChild(form);
}