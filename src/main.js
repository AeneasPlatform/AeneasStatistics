'use strict'

const argums = require('args')
const file_ops = require('../src/file_ops')
const array_ops = require('../src/array_ops')
const ownership_parser = require('../src/parsing/block_ownership_parser')

function main() {
  argums.command('ownership-correlation', 
                 'Creates a plot which demonstrates correlation of block ownership between different logs', 
                 (name, sub, options) => {
    const firstPath = sub[0]; 
    const secondPath = sub[1]; 
    if(file_ops.exists(firstPath) && file_ops.exists(secondPath)) {
      const result1 = ownership_parser.BlockOwnershipParser(firstPath).parseCorrectMined();
      const result2 = ownership_parser.BlockOwnershipParser(secondPath).parseCorrectMined();
      const diff = array_ops.arrayIntersection(result1, result2);
    } else {  // unlikely for branch predictor
      throw new Error("Some file does not exists");
    }
  });
  argums.command('compare-ownership', 
                 'Creates a plot which demonstrates lost or redundant blocks', 
                 (name, sub, options) => {
    const firstPath = sub[0]; 
    const secondPath = sub[1]; 
    if(file_ops.exists(firstPath) && file_ops.exists(secondPath)) {
      const result1 = ownership_parser.BlockOwnershipParser(firstPath).parseCorrectMined();
      const result2 = ownership_parser.BlockOwnershipParser(secondPath).parseCorrectMined();

    } else {  // unlikely for branch predictor
      throw new Error("Some file does not exists");
    }
  });
}

main();