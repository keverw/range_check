var assert = require('assert');
var rangeCheck = require('../range_check.js');

assert.equal(rangeCheck.displayIP(null), '');
assert.equal(rangeCheck.displayIP('::ffff:127.0.0.1'), '127.0.0.1');
assert.equal(rangeCheck.displayIP('2001:0:111:0:11:0:1:0'), '2001:0000:0111:0000:0011:0000:0001:0000');
assert.equal(rangeCheck.displayIP('2001:1:0:1::'), '2001:0001:0000:0001:0000:0000:0000:0000');
assert.equal(rangeCheck.displayIP('::'), '0000:0000:0000:0000:0000:0000:0000:0000');
assert.equal(rangeCheck.displayIP('::1'), '0000:0000:0000:0000:0000:0000:0000:0001');
assert.equal(rangeCheck.displayIP('2041:0:140F::875B:131B'), '2041:0000:140F:0000:0000:0000:875B:131B');
assert.equal(rangeCheck.displayIP('2001:1:2:3:4:5:6:7'), '2001:0001:0002:0003:0004:0005:0006:0007');
assert.equal(rangeCheck.displayIP('127.0.0.1'), '127.0.0.1');
