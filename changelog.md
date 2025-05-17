<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Change Log](#change-log)
  - [1.3.0 (Jul 23, 2016)](#130-jul-23-2016)
  - [1.4.0 (Jul 23, 2016)](#140-jul-23-2016)
  - [2.0.0 (June 30, 2020)](#200-june-30-2020)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Change Log

## 1.3.0 (Jul 23, 2016)

- Started a ChangeLog
- Improved readme
- Updated ipaddr.js to latest version
- Updated tests to use assert.equal, so if something returns something unexpected the test will crash.
- Uppercase `IP` is preferred over `ip` or `Ip` in function names and docs
- **Function renaming**
- . All older versions still work
  - `validip` is now `isIP`
  - `validRange` is now `isRange`

## 1.4.0 (Jul 23, 2016)

- added `isV4` and `isV6` functions
- Fixed issue [#12](https://github.com/keverw/range_check/issues/12)
- Added `storeIP`, `searchIP` and `displayIP` functions

## 2.0.0 (June 30, 2020)

- Converted project over to Typescript!
- _Breaking_: No more export alias, including for the misspelled ones left for backwards compatibility in prior versions.
- _Breaking_: `version` is now fully spelled out instead of `ver`.
- _Breaking_: Lowercase now being used for `storeIP` and `displayIP` https://stackoverflow.com/a/27510980/458642 - This matches the RFC that states `The characters "a", "b", "c", "d", "e", and "f" in an IPv6 address MUST be represented in lowercase.`. So if you stored any of this where case-sensitivity might matter such as perhaps a database index, make sure you correct that before upgrading!

# 3.0.0 (June 27, 2024)

- Converted to [bun-lib-starter](https://github.com/maxam2017/bun-lib-starter/tree/main)
- Fixed https://github.com/keverw/range_check/issues/25

# 3.1.0 (July 18, 2024)

- Added `isPrivateIP` function

# 3.2.0 (July 18, 2024)

- Added `isIPInRangeOrPrivate` function

# 4.0.0 (May 17, 2025)

- Enhanced `isPrivateIP` to check IPv4-mapped IPv6 addresses (e.g., ::ffff:192.168.1.1) for private ranges
- Added automatic README version updating from package.json during build
- Switched from Biome to Prettier for code formatting
- Cleaned up leftover configuration from bun-lib-starter template
- Fixed repository links in package.json
