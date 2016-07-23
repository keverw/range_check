var assert = require('assert');
var rangeCheck = require('../range_check.js');

assert.equal(rangeCheck.ver('10.0.1.5'), 4);
assert.equal(rangeCheck.ver('2001:4860:8006::62'), 6);
assert.equal(rangeCheck.ver('foo'), 0);
