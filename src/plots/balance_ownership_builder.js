'use strict'

const builder    = require('./abstract_plot_builder')
const file_ops   = require('../file_ops')
const csv_parser = require('papaparse')
const d3Node     = require('d3-node')

/**
 * 
 * @class BalanceDistributionBuilder
 * @param {string} reportPath : path to CSV report file.
 * @param {object} config : valid configuration of plot details. 
 */
class BalanceDistributionBuilder extends builder.AbstractPlotBuilder {
  constructor(reportPath, config) {
    super();
    this.reportPath = reportPath;
    this.report = csv_parser.parse(file_ops.readFile(reportPath), {header: true}); // map it to pairs [address -> block]
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
      return {address: el.adress.substring(el.adress.length - 5),  balance: el.balance / 100000000}
    });
  }

  /**
   * Creates the html doctument with address -> balance plot.
   * @param {boolean} sorted - trigger to sort collection (descending order)
   * @returns {string} 
   */
  buildPlot(sorted) {
    const margin = 80;
    const width = 7200 - margin;
    const height = 1200 - margin;

    const d3n = new d3Node({
      selector: this.config.selector,
      svgStyles: this.config.svgStyles,
      container: this.config.container
    });
    const d3 = d3n.d3;
    const svg = d3n.createSVG(width, height);

    const chart = svg.append('g').attr('transform', `translate(${margin}, ${margin})`);

    let data = this.transformData().filter(el => el.balance > 1000);
    data = sorted ? data.sort((a, b) => b.balance - a.balance) : data;

  
    const yScale = d3.scaleLinear()
                     .range([height - 150, 0])
                     .domain([0, d3.max(data, d => d.balance)]);

    const xScale = d3.scaleBand()
                     .range([0, width - 100])
                     .domain(data.map(s => s.address))
                     .padding(0.5);

    chart.append('g').attr('transform', `translate(20, 0)`).call(d3.axisLeft(yScale));
    chart.append('g').attr('transform', `translate(20, ${height - 150})`).call(d3.axisBottom(xScale));
    const multiplier = data.length > 40 ? 0.65 : 0.3;
    chart.selectAll()
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (s) => xScale(s.address) + xScale.bandwidth() * multiplier)
    .attr('y', (s) => yScale(s.balance))
    .attr('height', (s) => height - yScale(s.balance) - 150)
    .attr('width', xScale.bandwidth())
  
    return d3n.html();
  }
}

module.exports.BalanceDistributionBuilder = BalanceDistributionBuilder;