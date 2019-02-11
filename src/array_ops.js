'use strict'

var exports = module.exports = {};

/**
 * Intersects two arrays into result array.
 * @param first - first checked array.   Expected type is Array[Int].
 * @param second - second checked array. Expected type is Array[Int].
 * Algorithm complexity is : memory : O(log(N) * N) and time : O(N).
 * @returns sorted(!) array with unique elements which exists in both arrays.
 */
exports.arrayIntersection = (first, second) => {
  let set = new Set();
  let array = [];
  for(let i = 0; i < first.length; ++i)
    set.add(first[i]);

  for(let i = 0; i < second.length; ++i) {
    if (set.has(second[i])) {
      if (array.length == 0)
        array.push(second[i]);
      else if (array[array.length - 1] != second[i])
        array.push(second[i]);
    }
  }
  array.sort((a, b) => a - b);
  return array;
}