<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Change Log](#change-log)
  - [1.3.0](#130)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Change Log

## 1.3.0
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
