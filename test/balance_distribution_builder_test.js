'use strict'

const assert = require('assert')
const blockOwnership = require('../src/plots/balance_ownership_builder')

describe('BlockDistributionBuilder', () => {
  describe('#transformData()', () => {
    it('Should compare small balance and address contents correctly, bundle len is 5', () => {
      const builder = new blockOwnership.BalanceDistributionBuilder('test/resources/plots/very_small_balances_bundle.csv');
      const data = builder.transformData();
      const expectedBalances = [18080, 25840, 25440, 1360, 5040];
      const expectedAddr = ['ExEcD', 'THuxx', 'pANeZ', '8wFxX', 'EdAyG'];
      assert.equal(data.length, 5);
      assert.deepEqual(data.map(d => d.balance), expectedBalances);
      assert.deepEqual(data.map(d => d.address), expectedAddr);
    });
    it('Should compare big balance bundle length 142', () => {
      const builder = new blockOwnership.BalanceDistributionBuilder('test/resources/plots/big_balances_bundle.csv');
      const data = builder.transformData();
      assert.equal(data.length, 142);
    });
  });
});