'use strict'

const assert = require('assert')
const fs = require('fs')
const fileOperations = require('../src/file_ops')

describe('FileOperations', () => {
  describe('#readFile()', () => {
    it('Should open existing file and read its content', () => {
      assert.equal(fileOperations.readFile('test/resources/log_test1.txt'), "Block 1 has 4 transaction(s)");
    });
    it('Should not open file which is not exists', () => {
      assert.throws(() => (fileOperations.readFile('test/resources/log_test.log'), Error));
    });
  });
  describe('#readFileChunk()', () => {
    it('Should open existing file and read first 13 bytes', () => {
      let readResult = fileOperations.readFileChunk('test/resources/log_test1.txt', 0, 13);
      assert.equal(readResult, "Block 1 has 4");
    });
    it('Should open existing file and read 16 bytes by offset 12', () => {
      let readResult = fileOperations.readFileChunk('test/resources/log_test1.txt', 12, 16);
      assert.equal(readResult, "4 transaction(s)");
    });
    it('Should not open file which is not exists', () => {
      assert.throws(() => (fileOperations.readFileChunk('test/resources/file.txt', 0, 10), Error));
    });
  });
  describe('#writeToFile()', () => {
    it('Should create file and write the content', () => {
      fileOperations.writeToFile('Block 1 has 4 transaction(s)', 'test/resources/log_test_write.log');
      assert.equal(fileOperations.readFile('test/resources/log_test_write.log'), 'Block 1 has 4 transaction(s)');
    });
  });
  describe('#appendToFile()', () => {
    it('Should create file and append the content', () => {
      fileOperations.appendToFile('\nBlock 2 has 4 transaction(s)', 'test/resources/log_test_write.log');
      let readResult = fileOperations.readFile('test/resources/log_test_write.log');
      assert.equal(readResult, 'Block 1 has 4 transaction(s)\nBlock 2 has 4 transaction(s)');
      fs.unlinkSync('test/resources/log_test_write.log');
    });
  });
});