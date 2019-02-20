'use strict'

const balance_builder = require('./balance_ownership_builder')
const file_ops   = require('../file_ops')
const csv_parser = require('papaparse')
const d3Node     = require('d3-node')

/**
 * @class MinedBlockDistributionBuilder
 * @param {string} reportPath : path to CSV report file.
 * @param {object} config : valid configuration of plot details. 
 */
class MinedBlockDistributionBuilder extends balance_builder.BalanceDistributionBuilder {
  constructor(reportPath, config) {
    super(reportPath, config);
  }

  /**
   * Transform parsing data to {address -> blocks} pair collection.
   * @returns {object}
   */
  transformData() {
    return this.report.data.map(el => {
      return {address: el.adress.substring(el.adress.length - 4),  blocks: parseInt(el.blocks)}
    });
  }

  /**
   * Creates the html doctument with address -> block plot.
   * @returns {string} 
   */
  buildPlot(sorted) {
    const margin = 80;
    const width = 4800 - margin;
    const height = 1600 - margin;

    const d3n = new d3Node({
      selector: this.config.selector,
      svgStyles: this.config.svgStyles,
      container: this.config.container
    });
    const d3 = d3n.d3;
    const svg = d3n.createSVG(width, height);
    const chart = svg.append('g').attr('transform', `translate(${margin}, ${margin})`);

    let data = this.transformData().filter(el => el.blocks >= 150);
    data = sorted ? data.sort((a, b) => b.blocks - a.blocks) : data;
  
    const yScale = d3.scaleLinear()
                     .range([height - 150, 0])
                     .domain([0, d3.max(data, d => d.blocks)]);

    const xScale = d3.scaleBand()
                     .range([0, width - 100])
                     .domain(data.map(s => s.address))
                     .padding(0.3);

    chart.append('g').attr('transform', `translate(20, 0)`).call(d3.axisLeft(yScale));
    chart.append('g').attr('transform', `translate(20, ${height - 150})`).call(d3.axisBottom(xScale));
    const leftShift = data.length > 30 ? 0.27 : 0.25;
    chart.selectAll()
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (s) => xScale(s.address) + xScale.bandwidth() * leftShift) // TODO : wrap '30' to dependent function 
    .attr('y', (s) => yScale(s.blocks))
    .attr('height', (s) => height - yScale(s.blocks) - 150)
    .attr('width', xScale.bandwidth())
  
    return d3n.html();
  }
}

module.exports.MinedBlockDistributionBuilder = MinedBlockDistributionBuilder;