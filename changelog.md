<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Change Log](#change-log)
  - [1.3.0 (Jul 23, 2016)](#130-jul-23-2016)
  - [1.4.0 (Jul 23, 2016)](#140-jul-23-2016)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Change Log

## 1.3.0 (Jul 23, 2016)
* Started a ChangeLog
* Improved readme
* Updated ipaddr.js to latest version
* Updated tests to use assert.equal, so if something returns something unexpected the test will crash.
* Uppercase `IP` is preferred over `ip` or `Ip` in function names and docs
*	**Function renaming**
*
	. All older versions still work
	* `validip` is now `isIP`
	* `validRange` is now `isRange`

## 1.4.0 (Jul 23, 2016)
* added `isV4` and `isV6` functions
* Fixed issue [#12](https://github.com/keverw/range_check/issues/12)
* Added `storeIP`, `searchIP` and `displayIP` functions
