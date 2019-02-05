'use strict'

const argums = require('args')
const file_ops = require('../src/file_ops')

function main() {
  argums.command('hello', 'Say hello', () => {
    console.log("Hello World");
  });
  console.log(argums.details);
}

main();