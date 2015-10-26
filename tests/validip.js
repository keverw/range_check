var range_check = require('../range_check.js');

console.log(range_check.valid_ip('10.0.1.5')); //true

console.log(range_check.valid_ip('123:123')); //false

console.log(range_check.valid_ip('123::123')); //true

console.log(range_check.valid_ip('foo')); //false

console.log(range_check.valid_ip('192.168.1.1.')); //false