'use strict'

class AbstractPlotBuilder {
  constructor() {
    if (new.target === AbstractPlotBuilder) {
      throw new TypeError("Cannot construct Abstract Parser instances directly");
    }
  }

  buildPlot() {return undefined;}
};

module.exports.AbstractPlotBuilder = AbstractPlotBuilder;