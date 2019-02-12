'use strict'

const assert = require('assert')
const blockOwnership = require('../src/plots/block_ownership_builder')

describe('BlockDistributionBuilder', () => {
  describe('#transformData()', () => {
    it('Should compare small balance and address contents correctly, bundle len is 5', () => {
      const builder = new blockOwnership.BlockDistributionBuilder('test/resources/plots/small_balances_bundle.csv');
      const data = builder.transformData();
      const expectedBalances = [1808000000000, 2584000000000, 2544000000000, 136000000000, 504000000000];
      const expectedAddr = [
        'Æx3X7CZfj2JVtYZ7RDr2qnbY6EvFz2D4Ykp1HhugdHfgBEuExEcD', 
        'Æx3kmV54NWFSSv6fyNngpA63opGbA5phvjB5rCF8ftiqsCwTHuxx',
        'Æx3h9vwQ9nguTwqQgjwVT4BitLCHrmiF29dDuLCxNjcpaBmpANeZ',
        'Æx3ARaFCmgU3tkY8SWuKMU8pNqLNcWueHyyqzxagjrtSL838wFxX',
        'Æx3dNTh6WYgV3BY2C6EMNqJFGTJb17T7SRvQygnZnanKyhhEdAyG'
      ];
      assert.equal(data.length, 5);
      assert.deepEqual(data.map(d => d.balance), expectedBalances);
      assert.deepEqual(data.map(d => d.address), expectedAddr);
    });
    it('Should compare big balance bundle length 142', () => {
      const builder = new blockOwnership.BlockDistributionBuilder('test/resources/plots/big_balances_bundle.csv');
      const data = builder.transformData();
      assert.equal(data.length, 142);
    });
  });
});