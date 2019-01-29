'use strict'

const file = require('../file_ops')
const parser = require('./abstract_parser')

class BlockOwnershipParser extends parser.AbstractParser {
  constructor(logPath) {
    super();
    this.path = logPath;
  }
  // TODO: implement parsing.
}

module.exports.BlockOwnershipParser = BlockOwnershipParser;
