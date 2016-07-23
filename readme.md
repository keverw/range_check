# Range Check v1.3.0
[![npm version](https://badge.fury.io/js/range_check.svg)](https://badge.fury.io/js/range_check) &nbsp; [![Build Status](https://travis-ci.org/keverw/range_check.svg?branch=master)](https://travis-ci.org/keverw/range_check)

This is a simple module to validate IP address, check IP address version, check if IP is within a range.

This started out as `range_check` but it does much more than just checking ranges but since it's already got a large amount of downloads (37,115 downloads in the last month as of this writing) I'll keep the name the same even though I kinda want to change it to something better.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [IP Functions](#ip-functions)
  - [Check if IP is valid](#check-if-ip-is-valid)
  - [Check IP version](#check-ip-version)
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
```
var rangeCheck = require('range_check');
console.log(rangeCheck.ver('10.0.1.5')); //returns 4
console.log(rangeCheck.ver('2001:4860:8006::62')); //returns 6
console.log(rangeCheck.ver('foo')); //returns 0 as invalid IP address
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
