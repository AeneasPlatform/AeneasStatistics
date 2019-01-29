'use strict'

const args = require('args')

function main() {
  const flags = args.parse(process.argv)
  console.log(flags);
}

main();