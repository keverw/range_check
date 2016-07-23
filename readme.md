# Range Check v1.4.0
[![npm version](https://badge.fury.io/js/range_check.svg)](https://badge.fury.io/js/range_check) &nbsp; [![Build Status](https://travis-ci.org/keverw/range_check.svg?branch=master)](https://travis-ci.org/keverw/range_check)

This is a simple module to validate IP address, check IP address version, check if IP is within a range.

This started out as `range_check` but it does much more than just checking ranges but since it's already got a large amount of downloads (37,115 downloads in the last month as of this writing) I'll keep the name the same even though I kinda want to change it to something better.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [IP Functions](#ip-functions)
  - [Check if IP is valid](#check-if-ip-is-valid)
  - [Check IP version](#check-ip-version)
    - [Ver](#ver)
    - [isV4](#isv4)
    - [isV6](#isv6)
  - [storeIP](#storeip)
  - [searchIP](#searchip)
  - [displayIP](#displayip)
- [Range Functions](#range-functions)
  - [Check if range is valid](#check-if-range-is-valid)
  - [Check if IP is within range](#check-if-ip-is-within-range)
- [Dependencies](#dependencies)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

To set up Range Check on your Node.js server use npm.

`npm install range_check`

## IP Functions
### Check if IP is valid

```js
var rangeCheck = require('range_check');
console.log(rangeCheck.isIP('10.0.1.5')); //returns true or false
```

### Check IP version
#### Ver
```
var rangeCheck = require('range_check');
console.log(rangeCheck.ver('10.0.1.5')); //returns 4
console.log(rangeCheck.ver('2001:4860:8006::62')); //returns 6
console.log(rangeCheck.ver('foo')); //returns 0 as invalid IP address
```

#### isV4
```js
var rangeCheck = require('range_check');

console.log(rangeCheck.isV4('10.0.1.5')); //true
console.log(rangeCheck.isV4('foo')); //false
console.log(rangeCheck.isV4('123::123')); //false
```

#### isV6
```js
var rangeCheck = require('range_check');

console.log(rangeCheck.isV6('123::123')); //true
console.log(rangeCheck.isV6('foo')); //false
console.log(rangeCheck.isV6('10.0.1.5')); //false
```

### storeIP
This function is useful to get a consistent IP address such for storing it in a database or when searching in a database after being stored using this. So if a V6 address was sent compacted or not, or if you searched by either version this function would make sure you get a consistent IP address for both versions. Also the possibly of saving a few bytes.

If an V6 addressed mapped as v4 is given it will convert it to V4, If any other V6 address is given it is __abbreviated__ and plain V4 addresses are left alone. Returns null if a invalid IP

```js
var rangeCheck = require('../range_check.js');

console.log(rangeCheck.storeIP('foo')); //null
console.log(rangeCheck.storeIP('::ffff:127.0.0.1')); //127.0.0.1
console.log(rangeCheck.storeIP('2001:0000:0111:0000:0011:0000:0001:0000')); //2001:0:111:0:11:0:1:0
console.log(rangeCheck.storeIP('2001:0001:0000:0001:0000:0000:0000:0000')); //2001:1:0:1::
console.log(rangeCheck.storeIP('0000:0000:0000:0000:0000:0000:0000:0000')); //::
console.log(rangeCheck.storeIP('0000:0000:0000:0000:0000:0000:0000:0001')); //::1
console.log(rangeCheck.storeIP('2041:0000:140F:0000:0000:0000:875B:131B')); //2041:0:140F::875B:131B
console.log(rangeCheck.storeIP('2001:0001:0002:0003:0004:0005:0006:0007')); //2001:1:2:3:4:5:6:7
console.log(rangeCheck.storeIP('127.0.0.1')); //127.0.0.1
```

### searchIP
Same function as `storeIP`, just a clearer name when you are using it for search instead

### displayIP
This function is useful for displaying IP addresses, such as after grabbing it back from the database when using `storeIP`

If an V6 addressed mapped as v4 is given it will convert it to V4, If any other V6 address is given it is __normalized__ into the longer version and plain V4 addresses are left alone. Returns a empty string if a invalid IP

```js
var rangeCheck = require('../range_check.js');

console.log(rangeCheck.displayIP(null)); // ''
console.log(rangeCheck.displayIP('::ffff:127.0.0.1')); //'127.0.0.1'
console.log(rangeCheck.displayIP('2001:0:111:0:11:0:1:0')); //'2001:0000:0111:0000:0011:0000:0001:0000'
console.log(rangeCheck.displayIP('2001:1:0:1::')); //'2001:0001:0000:0001:0000:0000:0000:0000'
console.log(rangeCheck.displayIP('::')); //'0000:0000:0000:0000:0000:0000:0000:0000'
console.log(rangeCheck.displayIP('::1')); //'0000:0000:0000:0000:0000:0000:0000:0001'
console.log(rangeCheck.displayIP('2041:0:140F::875B:131B')); //'2041:0000:140F:0000:0000:0000:875B:131B'
console.log(rangeCheck.displayIP('2001:1:2:3:4:5:6:7')); //'2001:0001:0002:0003:0004:0005:0006:0007'
console.log(rangeCheck.displayIP('127.0.0.1')); //'127.0.0.1'

```

## Range Functions

### Check if range is valid

You can use isRange if you want to validate an entire range.

```js
var rangeCheck = require('range_check');

console.log(rangeCheck.isRange('2001:db8::/32')); //true
console.log(rangeCheck.isRange('10.0.0.0/8')); // true
console.log(rangeCheck.isRange('qwerty')); // false

```

### Check if IP is within range
```js
var rangeCheck = require('range_check');
console.log(rangeCheck.inRange('10.0.1.5', '10.0.0.0/8')); //returns true

console.log(rangeCheck.inRange('192.0.1.5', '10.0.0.0/8')); //returns false

console.log(rangeCheck.inRange('2001:db8:1234::1', '2001:db8::/32')); //returns true
```

You can also give a list of ranges

```js
var rangeCheck = require('range_check');
console.log(rangeCheck.inRange('192.168.1.1', ['10.0.0.0/8', '192.0.0.0/8'])); //returns true

```

## Dependencies
* ipaddr.js - [https://github.com/whitequark/ipaddr.js](https://github.com/whitequark/ipaddr.js)
* ip6 - [https://github.com/elgs/ip6](https://github.com/elgs/ip6)
