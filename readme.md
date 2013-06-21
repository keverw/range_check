# Range Check v0.0.4#
This is a simple module to validate IP address, check ip address version, check if IP is within a range.

## Setup ##

To set up Range Check on your Node.js server use npm.

    npm install range_check


##Check if IP is valid##

```
var range_check = require('range_check');
console.log(range_check.valid_ip('10.0.1.5')); //returns true or false
```

##Check IP version##
```
var range_check = require('range_check');
console.log(range_check.ver('10.0.1.5')); //returns 4
console.log(range_check.ver('2001:4860:8006::62')); //returns 6
```

##Check within range ##
```
var range_check = require('range_check');
console.log(range_check.in_range('10.0.1.5', '10.0.0.0/8')); //returns true

console.log(range_check.in_range('192.0.1.5', '10.0.0.0/8')); //returns false

console.log(range_check.in_range('2001:db8:1234::1', '2001:db8::/32')); //returns true
```

You can also give a list of ranges

```
var range_check = require('range_check');
console.log(range_check.in_range('192.168.1.1', ['10.0.0.0/8', '192.0.0.0/8'])); //returns true

```

##Dependencies##
- php.js - [http://phpjs.org/](http://phpjs.org/)
- ipaddr.js - [https://github.com/whitequark/ipaddr.js](https://github.com/whitequark/ipaddr.js)