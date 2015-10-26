var rangeCheck = require('../range_check.js');

console.log(rangeCheck.valid_range('2001:db8::/32')); //true
console.log(rangeCheck.valid_range('10.0.0.0/8')); // true
console.log(rangeCheck.valid_range('qwerty')); // false