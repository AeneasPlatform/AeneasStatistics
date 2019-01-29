'use strict'

const fs = require('fs')

let exports = module.exports = {};

exports.writeToFile = (record) => {
  fs.writeFileSync('results.csv', record.toString());
}

exports.appendToFile = (record) => {
  fs.appendFileSync('results.csv', record.toString());
}
