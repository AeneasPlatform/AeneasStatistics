'use strict'

const fs = require('fs')

var exports = module.exports = {};

exports.readFile = (filePath, encoding = 'utf8') => {
  if (fs.existsSync(filePath))
    return fs.readFileSync(filePath, encoding);
  else {
    throw new Error(```File ${filePath} doesn't exists```);
  }
}

exports.readFileChunk = (filePath, position, offset, encoding = 'utf8') => {
  if (!fs.existsSync(filePath)) {
    throw new Error(```File ${filePath} doesn't exists```);
  }
  let buffer = Buffer.alloc(offset);
  const fileDescriptor = fs.openSync(filePath, 'r');
  const bytesRead = fs.readSync(fileDescriptor, buffer, 0, offset, position);
	if (bytesRead < offset)
    buffer = buffer.slice(0, bytesRead);
    
	return buffer.toString(encoding);
};

exports.writeToFile = (record, fileName) => {
  fs.writeFileSync(fileName, record.toString());
}

exports.appendToFile = (record, fileName) => {
  fs.appendFileSync(fileName, record.toString());
}
