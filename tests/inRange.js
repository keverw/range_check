var assert = require('assert');
var rangeCheck = require('../range_check.js');

assert.equal(rangeCheck.inRange('10.0.1.5', '10.0.0.0/8'), true);

assert.equal(rangeCheck.inRange('192.0.1.5', '10.0.0.0/8'), false);

assert.equal(rangeCheck.inRange('2001:db8:1234::1', '2001:db8::/32'), true);

assert.equal(rangeCheck.inRange('192.168.1.1', ['10.0.0.0/8', '192.0.0.0/8']), true);

assert.equal(rangeCheck.inRange('foo', ['10.0.0.0/8', '192.0.0.0/8']), false);

assert.equal(rangeCheck.inRange('0::', '0000::/128'), true);
assert.equal(rangeCheck.inRange('0::', '0000::'), true);
assert.equal(rangeCheck.inRange('0::', '0::'), true);

assert.equal(rangeCheck.inRange('lol', 'lol'), false);
