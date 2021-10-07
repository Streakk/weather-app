/**
 * Populates thead element with labels .
 * @param {array} labels - An array of labels.
 * @param {object} theadTr - tr element.
 * @param {object} theadElement - thead element.
 * @param {object} tableElement - Table element.
 * @returns {void}
 */
function populateTableHeader(labels, theadTr, theadElement, tableElement) {
  for (let i = 0; i < labels.length; i++) {
    let theadTh = document.createElement('th');
    theadTh.innerHTML = labels[i];
    theadTr.appendChild(theadTh);
  }
  theadElement.appendChild(theadTr);
  tableElement.appendChild(theadElement);
}

/**
 * Populates tbody element with data.
 * @param {object} data - Formatted table data.
 * @param {object} tbodyElement - Table body element.
 * @returns {void}
 */
function populateTableBody(data, tbodyElement) {
  for (let i = 0; i < data.weatherData.length; i++) {
    let tbodyTr = document.createElement('tr');
    for (const [key, value] of Object.entries(data.weatherData[i])) {
      if (key === 'summary' && value !== 'N/A') {
          let tbodyTd = document.createElement('td');
          let imgElement = document.createElement('img');
          imgElement.setAttribute('src', `../icons/${value}.svg`);
          tbodyTd.appendChild(imgElement);
          tbodyTr.appendChild(tbodyTd);
      } else {
        let tbodyTd = document.createElement('td');
        tbodyTd.innerHTML = value;
        tbodyTr.appendChild(tbodyTd);
      }
    }
    tbodyElement.appendChild(tbodyTr);
  }
}

/**
 * Creates all required table elements.
 * @param {string} id - Id attribute of table.
 * @param {object} parent - Document body.
 * @param {object} data - Formatted table data.
 * @returns {void}
 */
export default function createTable(id, parent, data) {
  let divWrapper = document.createElement('div');
  let tableElement = document.createElement('table');
  let theadElement = document.createElement('thead');
  let tbodyElement = document.createElement('tbody');

  let theadTr = document.createElement('tr');

  divWrapper.id = id;

  populateTableHeader(data.labels, theadTr, theadElement, tableElement);
  populateTableBody(data, tbodyElement);

  tableElement.appendChild(tbodyElement);
  parent.appendChild(divWrapper);
  divWrapper.appendChild(tableElement);
}
