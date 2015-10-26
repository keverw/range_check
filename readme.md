[![Build Status](https://travis-ci.org/keverw/range_check.svg?branch=master)](https://travis-ci.org/keverw/range_check)

#Range Check v1.2.0
This is a simple module to validate IP address, check ip address version, check if IP is within a range.

##Setup

To set up Range Check on your Node.js server use npm.

`npm install range_check`


##Check if IP is valid

```
var rangeCheck = require('range_check');
console.log(rangeCheck.validIp('10.0.1.5')); //returns true or false
```

##Check if Range is valid

You can use validRange if you want to vaildate an entire range.

```
var rangeCheck = require('range_check');

console.log(rangeCheck.validRange('2001:db8::/32')); //true
console.log(rangeCheck.validRange('10.0.0.0/8')); // true
console.log(rangeCheck.validRange('qwerty')); // false

```


##Check IP version
```
var rangeCheck = require('range_check');
console.log(rangeCheck.ver('10.0.1.5')); //returns 4
console.log(rangeCheck.ver('2001:4860:8006::62')); //returns 6
console.log(rangeCheck.ver('foo')); //returns 0 as invalid IP address
```

##Check if IP is within range
```
var rangeCheck = require('range_check');
console.log(rangeCheck.inRange('10.0.1.5', '10.0.0.0/8')); //returns true

console.log(rangeCheck.inRange('192.0.1.5', '10.0.0.0/8')); //returns false

console.log(rangeCheck.inRange('2001:db8:1234::1', '2001:db8::/32')); //returns true
```

You can also give a list of ranges

```
var rangeCheck = require('range_check');
console.log(rangeCheck.inRange('192.168.1.1', ['10.0.0.0/8', '192.0.0.0/8'])); //returns true

```

##Dependencies##
- ipaddr.js - [https://github.com/whitequark/ipaddr.js](https://github.com/whitequark/ipaddr.js)