# Range Check #
This is a simple module for to vaildate IP, check version, check if within range.

## Setup ##
later

##Check if IP is vaild##

```
var range_check = require('range_check');
console.log(range_check.vaild_ip('10.0.1.5')); //returns true or false
```

##Check IP version##
```
var range_check = require('range_check');
console.log(range_check.ver('10.0.1.5')); //returns 4
console.log(range_check.ver('2001:4860:8006::62')); //returns 6
```