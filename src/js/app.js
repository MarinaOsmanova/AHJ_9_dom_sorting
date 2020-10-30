import getData from './data';

const sortedFields = ['id', 'title', 'year', 'imdb'];
const contentEl = document.querySelector('.content');

let fieldIndex = 0;
let orderSort = 'asc';

function sortSign(currentField, fieldSort, order) {
  if (currentField !== fieldSort) {
    return '';
  }
  if (order === 'asc') {
    return ' &darr;';
  }
  return ' &uarr;';
}

function getTableHeadHtml(fieldSort, order) {
  let headHtml = '<tr>';
  for (let i = 0; i < sortedFields.length; i += 1) {
    headHtml += `<th>${sortedFields[i]}${sortSign(sortedFields[i], fieldSort, order)}</th>`;
  }
  headHtml += '</tr>';
  return headHtml;
}

function formattedCell(text, index) {
  if (index < 2) {
    return text;
  }
  if (index === 2) {
    return `(${text})`;
  }
  return `imdb: ${text.toFixed(2)}`;
}

function getOneRowHtml(row) {
  let html = '';
  for (let i = 0; i < sortedFields.length; i += 1) {
    html += `<td>${formattedCell(row[sortedFields[i]], i)}</td>`;
  }
  return html;
}

function getRowsHtml(data) {
  let html = '';
  for (let i = 0; i < data.length; i += 1) {
    html += `<tr>${getOneRowHtml(data[i])}</tr>`;
  }
  return html;
}

function showData(data, fieldSort = null, order = null) {
  const html = `<table class="data">${getTableHeadHtml(fieldSort, order)}${getRowsHtml(data)}</table>`;
  contentEl.innerHTML = html;
}

function sortAndShowData() {
  const data = getData();
  data.sort((a, b) => {
    const paramName = sortedFields[fieldIndex];
    let value1 = a[paramName];
    let value2 = b[paramName];
    if (fieldIndex !== 1) {
      value1 = parseFloat(value1);
      value2 = parseFloat(value2);
    }
    if (value1 === value2) {
      return 0;
    }
    if (value1 < value2) {
      return orderSort === 'asc' ? -1 : 1;
    }
    return orderSort === 'asc' ? 1 : -1;
  });
  showData(data, sortedFields[fieldIndex], orderSort);
  if (orderSort === 'asc') {
    orderSort = 'desc';
  } else {
    orderSort = 'asc';
    fieldIndex += 1;
    if (fieldIndex === sortedFields.length) {
      fieldIndex = 0;
    }
  }
}

showData(getData());
setInterval(sortAndShowData, 2000);
