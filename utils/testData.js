const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

function readExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  const data = {};

  workbook.SheetNames.forEach(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { defval: '' });

    // Normalize photo paths for OS-independent separators
    jsonData.forEach(row => {
      if (row.Photos) {
        row.Photos = row.Photos.split(',')
          .map(photoPath => path.normalize(photoPath.trim()))
          .join(',');
      }
    });

    data[sheetName] = jsonData;
  });

  return data;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

module.exports = { readExcel, readJson };