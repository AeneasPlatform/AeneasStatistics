'use strict'

const assert = require('assert')
const array_ops = require('../src/array_ops')

describe('ArrayOperations', () => {
  describe('#arrayIntersection()', () => {
    it('Should intersect [1, 2, 3] and [1, 2] with result [1, 2]', () => {
      const expected = [1, 2];
      assert.deepEqual(array_ops.arrayIntersection([1, 2, 3], [1, 2]), expected);
    });
    it('Should intersect [3, 2, 1] and [5, 2] with result [2]', () => {
      const expected = [2];
      assert.deepEqual(array_ops.arrayIntersection([3, 2, 1], [5, 2]), expected);
    });
    it('Should intersect arr1 and arr2 with result [99, 100]', () => {
      const arr1 = [20, 2, 4, 100, 24, 55, 34, 66, 99, 124, 322, 9, 85];
      const arr2 = [99, 52, 48, 99, 224, 5565, 40, 660, 120, 100];
      const expected = [99, 100];
      assert.deepEqual(array_ops.arrayIntersection(arr1, arr2), expected);
    });
    it('Should correctly intersect empty arrays with answer []', () => {
      const expected = [];
      assert.deepEqual(array_ops.arrayIntersection([], []), expected);
    });
    it('Should return empty array if first input array is []', () => {
      const expected = [];
      assert.deepEqual(array_ops.arrayIntersection([], [1, 2, 10, 20, 2, 5]), expected);
    });
    it('Should return empty array if second input array is []', () => {
      const expected = [];
      assert.deepEqual(array_ops.arrayIntersection([1, 2, 10, 20, 2, 5], []), expected);
    });
  });
});