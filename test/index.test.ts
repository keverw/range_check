import { test, expect } from 'bun:test';
import { isIP, version, isV4, isV6, isRange, inRange, storeIP, displayIP, searchIP } from '../src/index';

test('isIP', function () {
  expect(isIP('10.0.1.5')).toBeTruthy();
  expect(isIP('123:123')).toBeFalsy();
  expect(isIP('123::123')).toBeTruthy();
  expect(isIP('foo')).toBeFalsy();
  expect(isIP('192.168.1.1.')).toBeFalsy();
});

test('version', function () {
  expect(version('10.0.1.5')).toEqual(4);
  expect(version('2001:4860:8006::62')).toEqual(6);
  expect(version('foo')).toEqual(0);
});

test('isV4', function () {
  expect(isV4('10.0.1.5')).toBeTruthy();
  expect(isV4('123::123')).toBeFalsy();
  expect(isV4('foo')).toBeFalsy();
});

test('isV6', function () {
  expect(isV6('10.0.1.5')).toBeFalsy();
  expect(isV6('123::123')).toBeTruthy();
  expect(isV6('foo')).toBeFalsy();
});

test('isRange', function () {
  expect(isRange('2001:db8::/32')).toBeTruthy();
  expect(isRange('10.0.0.0/8')).toBeTruthy();
  expect(isRange('qwerty')).toBeFalsy();
});

test('inRange', function () {
  expect(inRange('10.0.1.5', '10.0.0.0/8')).toBeTruthy();
  expect(inRange('192.0.1.5', '10.0.0.0/8')).toBeFalsy();
  expect(inRange('2001:db8:1234::1', '2001:db8::/32')).toBeTruthy();
  expect(inRange('192.168.1.1', ['10.0.0.0/8', '192.0.0.0/8'])).toBeTruthy();
  expect(inRange('foo', ['10.0.0.0/8', '192.0.0.0/8'])).toBeFalsy();
  expect(inRange('0::', '0000::/128')).toBeTruthy();
  expect(inRange('0::', '0000::')).toBeTruthy();
  expect(inRange('0::', '0::')).toBeTruthy();
  expect(inRange('lol', 'lol')).toBeFalsy();

  // @ts-ignore: Just testing for unit testing
  expect(inRange('lol', 1)).toBeFalsy();
});

test('storeIP', function () {
  expect(storeIP('foo')).toBeNull();
  expect(storeIP('::ffff:127.0.0.1')).toEqual('127.0.0.1');
  expect(storeIP('2001:0000:0111:0000:0011:0000:0001:0000')).toEqual('2001:0:111:0:11:0:1:0');
  expect(storeIP('2001:0001:0000:0001:0000:0000:0000:0000')).toEqual('2001:1:0:1::');
  expect(storeIP('0000:0000:0000:0000:0000:0000:0000:0000')).toEqual('::');
  expect(storeIP('0000:0000:0000:0000:0000:0000:0000:0001')).toEqual('::1');
  expect(storeIP('2041:0000:140F:0000:0000:0000:875B:131B')).toEqual('2041:0:140f::875b:131b');
  expect(storeIP('2001:0001:0002:0003:0004:0005:0006:0007')).toEqual('2001:1:2:3:4:5:6:7');
  expect(storeIP('127.0.0.1')).toEqual('127.0.0.1');
  expect(storeIP('::ffff:127.0.0.1')).toEqual(searchIP('::ffff:127.0.0.1'));

  // @ts-ignore: Just testing for unit testing
  expect(storeIP(1)).toBeFalsy();
});

test('displayIP', function () {
  // @ts-ignore: displayIP only takes string, but testing if null is passed in
  expect(displayIP(null)).toEqual('');
  expect(displayIP('::ffff:127.0.0.1')).toEqual('127.0.0.1');
  expect(displayIP('2001:0:111:0:11:0:1:0')).toEqual('2001:0000:0111:0000:0011:0000:0001:0000');
  expect(displayIP('2001:1:0:1::')).toEqual('2001:0001:0000:0001:0000:0000:0000:0000');
  expect(displayIP('::')).toEqual('0000:0000:0000:0000:0000:0000:0000:0000');
  expect(displayIP('::1')).toEqual('0000:0000:0000:0000:0000:0000:0000:0001');
  expect(displayIP('2041:0:140F::875B:131B')).toEqual('2041:0000:140f:0000:0000:0000:875b:131b');
  expect(displayIP('2001:1:2:3:4:5:6:7')).toEqual('2001:0001:0002:0003:0004:0005:0006:0007');
  expect(displayIP('127.0.0.1')).toEqual('127.0.0.1');
});
