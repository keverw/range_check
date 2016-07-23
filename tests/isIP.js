var assert = require('assert');
var rangeCheck = require('../range_check.js');

assert.equal(rangeCheck.isIP('10.0.1.5'), true);

assert.equal(rangeCheck.isIP('123:123'), false);

assert.equal(rangeCheck.isIP('123::123'), true);

assert.equal(rangeCheck.isIP('foo'), false);

assert.equal(rangeCheck.isIP('192.168.1.1.'), false);
