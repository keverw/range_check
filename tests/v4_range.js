var range_check = require('../range_check.js');

console.log(range_check.in_range('10.0.1.5', '10.0.0.0/8')); //true

console.log(range_check.in_range('192.0.1.5', '10.0.0.0/8')); //false

console.log(range_check.in_range('2001:db8:1234::1', '2001:db8::/32')); //true

console.log(range_check.in_range('192.168.1.1', ['10.0.0.0/8', '192.0.0.0/8'])); //true