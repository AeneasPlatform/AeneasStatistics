'use strict'

class AbstractParser {
  constructor() {
    if (new.target === AbstractParser) {
      throw new TypeError("Cannot construct Abstract Parser instances directly");
    }
  }
};

module.exports.AbstractParser = AbstractParser;