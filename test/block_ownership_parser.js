'use strict'

const assert = require('assert')
const blockOwnership = require('../src/parsing/block_ownership_parser')
const fs = require('fs')

// 6267 - 3324 = 2943

describe('BlockOwnershipParser', () => {
  describe('#parseCorrectMined()', () => {
    it('Should open existing file, read all blocks info and return array with size 111', () => {
      const parser = new blockOwnership.BlockOwnershipParser('test/resources/log_test_parse.txt');
      assert.equal(parser.parseCorrectMined().length, 111);
    });
    it('Should open existing file, read all blocks info and return array where 3rd element is 6258', () => {
      const parser = new blockOwnership.BlockOwnershipParser('test/resources/log_test_parse.txt');
      assert.equal(parser.parseCorrectMined()[2], 6258);
    });
    it('Should open existing file, read all blocks info and return array where 11th element is 4433', () => {
      const parser = new blockOwnership.BlockOwnershipParser('test/resources/log_test_parse.txt');
      assert.equal(parser.parseCorrectMined()[10], 4433);
    });
    it('Should open existing file, read all blocks info and return array where random element is correct', () => {
      const parser = new blockOwnership.BlockOwnershipParser('test/resources/log_test_parse.txt');
      const parsingResult = parser.parseCorrectMined();
      const randomIdx = Math.floor(Math.random() * parsingResult.length);
      assert.equal(parsingResult[randomIdx], parser.parseCorrectMined()[randomIdx]);
    });
  });
  describe('#parseCorrectMined()', () => {
    it('Should open existing file, read all blocks info and return array with size 111', () => {
      const parser = new blockOwnership.BlockOwnershipParser('test/resources/log_test_revenue.txt');
      assert.equal(parser.parseRevenueBlocks().length, 119);
    });
    it('Should open existing file, read all blocks info and return array where 3rd element is 6258', () => {
      const parser = new blockOwnership.BlockOwnershipParser('test/resources/log_test_revenue.txt');
      assert.equal(parser.parseRevenueBlocks()[2], 6258);
    });
    it('Should open existing file, read all blocks info and return array where 11th element is 5555', () => {
      const parser = new blockOwnership.BlockOwnershipParser('test/resources/log_test_revenue.txt');
      assert.equal(parser.parseRevenueBlocks()[10], 5555);
    });
    it('Should open existing file, read all blocks info and return array where random element is correct', () => {
      const parser = new blockOwnership.BlockOwnershipParser('test/resources/log_test_revenue.txt');
      const parsingResult = parser.parseRevenueBlocks();
      const randomIdx = Math.floor(Math.random() * parsingResult.length);
      assert.equal(parsingResult[randomIdx], parser.parseRevenueBlocks()[randomIdx]);
    });
  });
});