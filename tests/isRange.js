var assert = require('assert');
var rangeCheck = require('../range_check.js');

assert.equal(rangeCheck.isRange('2001:db8::/32'), true);
assert.equal(rangeCheck.isRange('10.0.0.0/8'),  true);
assert.equal(rangeCheck.isRange('qwerty'),  false);
