'use strict'

const argums = require('args')
const file_ops = require('../src/file_ops')
const array_ops = require('../src/array_ops')
const ownership_parser = require('../src/parsing/block_ownership_parser')
const balance_builder = require('../src/plots/balance_ownership_builder')
const block_builder = require('../src/plots/mined_block_ownership_builder')

function main() {
  const defaultConfig = {
    width : 1200,
    height : 1000,
    barColor : "steelblue",
    barHoverColor : "brown",
    selector  : "#chart",
    container : "<div id=\"container\"><h2>Bar Chart</h2><div id=\"chart\"></div></div>",
    svgStyles : ".bar { fill: \"steelblue\" } .bar:hover { fill: \"brown\" }"
  }

  argums.command('ownership-correlation', 
                 'Creates a plot which demonstrates correlation of block ownership between different logs', 
                 (name, sub, options) => {
    console.log(name + " __ " + sub);
    const firstPath = sub[0]; 
    const secondPath = sub[1]; 
    if(file_ops.exists(firstPath) && file_ops.exists(secondPath)) {
      const result1 = ownership_parser.BlockOwnershipParser(firstPath).parseCorrectMined();
      const result2 = ownership_parser.BlockOwnershipParser(secondPath).parseCorrectMined();
      const diff = array_ops.arrayIntersection(result1, result2);
      // TODO: create D3 plot.
      return diff;
    } else {  // unlikely for branch predictor
      throw new Error("Some file does not exists");
    }
  });
  argums.command('balance-address-plot', 
                 '[path to csv report] ' + 
                 '[path to config / \'default\'] ' +  
                 '[sorted] (if you want to see sorted plots, optional)', 
                 (name, sub, options) => {
    const csvFilePath = sub[0]; 
    const configPath = sub[1];
    const sorted = sub[2] == 'sorted';

    let config = undefined;
    if (configPath != 'default') {
      config = JSON.parse(file_ops.readFile(configPath));
    } else config = defaultConfig;

    if (balance_builder.BalanceDistributionBuilder.validateConfig(config))
      throw new Error("Config parsing error.");
    
    if(file_ops.exists(csvFilePath)) {
      const builder = new balance_builder.BalanceDistributionBuilder(csvFilePath, config);
      const data = builder.transformData();
      file_ops.writeToFile(builder.buildPlot(sorted), "report-balance.html");
    } else {  // unlikely for branch predictor
      throw new Error("Some file does not exists");
    }
    console.log('HTML report successfully created');
  });
  argums.command('block-address-plot', 
                '[path to csv report] ' + 
                '[path to config / \'default\'] ' +  
                '[sorted] (if you want to see sorted plots, optional)', 
                 (name, sub, options) => {
    const csvFilePath = sub[0]; 
    const configPath = sub[1] ;
    const sorted = sub[2] == 'sorted';

    let config = undefined;
    if (configPath != 'default') {
      config = JSON.parse(file_ops.readFile(configPath));
    } else config = defaultConfig;
    if (balance_builder.BalanceDistributionBuilder.validateConfig(config))
      throw new Error("Config parsing error.");
    
    if(file_ops.exists(csvFilePath)) {
      const builder = new block_builder.MinedBlockDistributionBuilder(csvFilePath, config);
      const data = builder.transformData();
      file_ops.writeToFile(builder.buildPlot(sorted), "report-block.html");
    } else {  // unlikely for branch predictor
      throw new Error("Some file does not exists");
    }
    console.log('HTML report successfully created');
  });

  const flags = argums.parse(process.argv)
}

main();