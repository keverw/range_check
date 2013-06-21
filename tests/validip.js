var range_check = require('../range_check.js');

console.log(range_check.valid_ip('10.0.1.5'));

console.log(range_check.valid_ip('123:123'));

console.log(range_check.valid_ip('123::123'));
