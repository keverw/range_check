var rangeCheck = require('../range_check.js');

console.log(rangeCheck.inRange('192.168.1.1', ['10.0.0.0/8', '192.0.0.0/8']));
console.log(rangeCheck.validIp('123::123'));