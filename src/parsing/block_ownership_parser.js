'use strict'

const file = require('../file_ops')
const parser = require('./abstract_parser')

class BlockOwnershipParser extends parser.AbstractParser {
  constructor(logPath) {
    super();
    this.path = logPath;
  }
  static inputBlocksRegex = "[0-9]+\/[0-9]+\s[0-9]{2}:[0-9]{2}:[0-9]{2}\sINFO\s\[lt\-dispatcher\-[0-9]+\]\sw\." + 
                            "AeneasWallet\s0\sAE\swas\sextracted\sas IN\sfrom\sblock\s#[0-9]+" 

  parse() {
    // TODO: implement
  }
}

module.exports.BlockOwnershipParser = BlockOwnershipParser;
