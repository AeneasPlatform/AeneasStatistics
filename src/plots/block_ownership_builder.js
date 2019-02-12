'use strict'

const builder = require('./abstract_plot_builder')
const file_ops = require('../file_ops')
const csv_parser = require('papaparse')
const d3Node = require('d3-node')

/**
 * 
 * @class BlockDistributionBuilder
 * @param {string} reportPath : path to CSV report file.
 * @param {object} config : valid configuration of plot details. 
 */
class BlockDistributionBuilder extends builder.AbstractPlotBuilder {
  constructor(reportPath, config) {
    super();
    this.reportPath = reportPath;
    this.report = csv_parser.parse(file_ops.readFile(reportPath), {header: true}); // map it to pairs [address -> balance]
    this.config = config;
  }

  /**
   * @param {object} config 
   * @returns {Boolean} true if ANY of this config parameters will be empty.
   */
  static validateConfig(config) {
    return config.svgStyles == undefined || 
    config.width    == undefined || config.height        == undefined ||
    config.barColor == undefined || config.barHoverColor == undefined ||
    config.selector == undefined || config.container     == undefined;
  }

  /**
   * Transform parsing data to {address -> balance} pair collection.
   * @returns {object}
   */
  transformData() {
    return this.report.data.map(el => {
      return {address: el.adress,  balance: el.balance}
    });
  }

  /**
   * Creates the html doctument with address -> balance plot.
   * @returns {string} 
   */
  buildPlot() {
    console.log(this.config);
    const d3n = new d3Node({
      selector: this.config.selector,
      svgStyles: this.config.svgStyles,
      container: this.config.container
    });
  
    const d3 = d3n.d3;

    const width = this.config.width;
    const height = this.config.height;

    const data = this.transformData();
  
    // set the ranges
    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);
  
    const svg = d3n.createSVG(width, height)
      .append('g')
      .attr('transform', 'translate(10, 10)');
  
    x.domain(data.map(d => d.adress));
    y.domain([0, d3.max(data, d => d.balance)]);
  
    // append the rectangles for the bar chart
    svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.adress))
        .attr('width', x.bandwidth())
        .attr('y', (d) => y(d.balance))
        .attr('height', (d) => height - y(d.balance));
  
    // add the x Axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));
  
    // add the y Axis
    svg.append('g').call(d3.axisLeft(y));
  
    return d3n.html();
  }
}

module.exports.BlockDistributionBuilder = BlockDistributionBuilder;