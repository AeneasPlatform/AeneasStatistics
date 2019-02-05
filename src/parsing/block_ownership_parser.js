'use strict'

const fs = require('fs')
const fileOperations = require('../file_ops')
const parser = require('./abstract_parser')

class BlockOwnershipParser extends parser.AbstractParser {
  constructor(logPath) {
    super();
    this.logPath = logPath;
    this.correctMinedBlocksRegex = /[0-9]+\/[0-9]+ [0-9]{2}:[0-9]{2}:[0-9]{2} INFO \[l*t\-dispatcher\-[0-9]+\] w\.AeneasWallet 8000000000 AE was extracted as IN from block #[0-9]+/g
    this.revenueBlocksRegex =      /[0-9]+\/[0-9]+ [0-9]{2}:[0-9]{2}:[0-9]{2} INFO \[l*t\-dispatcher\-[0-9]+\] w\.AeneasWallet [1-9][0-9]+ AE was extracted as IN from block #[0-9]+/g

    Object.freeze(this);
  }

  /**
   * Synchronous parsing of .log file. It extracts numbers of all blocks which was extracted as mined.
   * @return blockNumbers : Array[String]
   */
  parseCorrectMined() {
    const resultativeBlocks = fileOperations.readFile(this.logPath).match(this.correctMinedBlocksRegex);
    return resultativeBlocks.map(record => 
      record.substring(record.length - 6, record.length).replace( /^\D+/g, '')
    );
  }
  /**
   * Parsing of .log file. 
   * It extracts numbers of all blocks which was extracted as mined and revenued and revenue overall.
   * @return object : { blockNumbers : Array[String], revenueSum : Number } 
   */
  parseRevenueBlocks() {
    const resultativeBlocks = fileOperations.readFile(this.logPath).match(this.revenueBlocksRegex);
    // TODO: add revenue sum for all blocks.
    return resultativeBlocks.map(record => 
      record.substring(record.length - 6, record.length).replace( /^\D+/g, '')
    );
  }
}

module.exports.BlockOwnershipParser = BlockOwnershipParser;
