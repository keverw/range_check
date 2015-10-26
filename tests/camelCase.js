var rangeCheck = require('../range_check.js');

console.log(rangeCheck.inRange('192.168.1.1', ['10.0.0.0/8', '192.0.0.0/8'])); //true
console.log(rangeCheck.validIp('123::123')); //true

console.log(rangeCheck.inRange('foo', ['10.0.0.0/8', '192.0.0.0/8'])); //false
console.log(rangeCheck.validIp('foo')); //false