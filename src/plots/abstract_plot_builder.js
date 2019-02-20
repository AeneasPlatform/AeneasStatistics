'use strict'

class AbstractPlotBuilder {
  constructor() {
    if (new.target === AbstractPlotBuilder) {
      throw new TypeError("Cannot construct Abstract Parser instances directly");
    }
  }

  buildPlot() {
    throw new TypeError("Cannot build plot because buildPlot doesn't implemented");
  }
};

module.exports.AbstractPlotBuilder = AbstractPlotBuilder;