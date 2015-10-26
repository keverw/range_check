var range_check = require('../range_check.js');

console.log(range_check.ver('10.0.1.5')); //4
console.log(range_check.ver('2001:4860:8006::62')); //6
console.log(range_check.ver('foo')); //0