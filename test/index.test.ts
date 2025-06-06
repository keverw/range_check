import { test, expect } from 'bun:test';
import {
  isIP,
  version,
  isV4,
  isV6,
  isRange,
  inRange,
  storeIP,
  displayIP,
  searchIP,
  isPrivateIP,
  isIPInRangeOrPrivate,
  IPFingerprint,
  IPFingerprintHashed,
} from '../src/index';

test('isIP', function () {
  expect(isIP('10.0.1.5')).toBeTruthy();
  expect(isIP('123:123')).toBeFalsy();
  expect(isIP('123::123')).toBeTruthy();
  expect(isIP('foo')).toBeFalsy();
  expect(isIP('192.168.1.1.')).toBeFalsy();

  // from: https://github.com/keverw/range_check/issues/25
  expect(isIP('1')).toBeFalsy();
});

test('version', function () {
  expect(version('10.0.1.5')).toEqual(4);
  expect(version('2001:4860:8006::62')).toEqual(6);
  expect(version('foo')).toEqual(0);

  // from: https://github.com/keverw/range_check/issues/25
  expect(version('1')).toEqual(0);
});

test('isV4', function () {
  expect(isV4('10.0.1.5')).toBeTruthy();
  expect(isV4('123::123')).toBeFalsy();
  expect(isV4('foo')).toBeFalsy();
  // from: https://github.com/keverw/range_check/issues/25
  expect(isV4('1')).toBeFalsy();
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

test('isPrivateIP', function () {
  // IPv4 tests
  expect(isPrivateIP('10.0.0.1')).toBeTruthy(); // Class A private network
  expect(isPrivateIP('10.255.255.255')).toBeTruthy(); // Class A private network (upper bound)
  expect(isPrivateIP('172.16.0.1')).toBeTruthy(); // Class B private network
  expect(isPrivateIP('172.31.255.255')).toBeTruthy(); // Class B private network (upper bound)
  expect(isPrivateIP('192.168.0.1')).toBeTruthy(); // Class C private network
  expect(isPrivateIP('192.168.255.255')).toBeTruthy(); // Class C private network (upper bound)
  expect(isPrivateIP('127.0.0.1')).toBeTruthy(); // Loopback address
  expect(isPrivateIP('127.255.255.255')).toBeTruthy(); // Loopback network (upper bound)
  expect(isPrivateIP('8.8.8.8')).toBeFalsy(); // Public IP (Google DNS)
  expect(isPrivateIP('11.0.0.1')).toBeFalsy(); // Public IP (just outside Class A private range)

  // IPv6 tests
  expect(isPrivateIP('fd00::1')).toBeTruthy(); // Unique Local Address (ULA)
  expect(isPrivateIP('fdff:ffff:ffff:ffff:ffff:ffff:ffff:ffff')).toBeTruthy(); // Max ULA
  expect(isPrivateIP('fc00::1')).toBeTruthy(); // Min ULA
  expect(isPrivateIP('::1')).toBeTruthy(); // Loopback address
  expect(isPrivateIP('::ffff:127.0.0.1')).toBeTruthy(); // IPv4-mapped address
  expect(isPrivateIP('fe80::1')).toBeFalsy(); // Link-local address (not considered private)
  expect(isPrivateIP('2001:db8::1')).toBeFalsy(); // Documentation prefix (not private)
  expect(isPrivateIP('2001::')).toBeFalsy(); // Global Unicast Address

  // Invalid IP tests
  expect(isPrivateIP('256.0.0.1')).toBeFalsy(); // Invalid IPv4 (octet > 255)
  expect(isPrivateIP('192.168.1.256')).toBeFalsy(); // Invalid IPv4 (last octet > 255)
  expect(isPrivateIP('2001:db8::g')).toBeFalsy(); // Invalid IPv6 (contains 'g')
  expect(isPrivateIP('not an ip')).toBeFalsy(); // Non-IP string
  expect(isPrivateIP('')).toBeFalsy(); // Empty string
});

test('isIPInRangeOrPrivate', function () {
  // Test with default options (allow any private)
  expect(isIPInRangeOrPrivate('192.168.1.1')).toBeTruthy();
  expect(isIPInRangeOrPrivate('10.0.0.1')).toBeTruthy();
  expect(isIPInRangeOrPrivate('172.16.0.1')).toBeTruthy();
  expect(isIPInRangeOrPrivate('8.8.8.8')).toBeFalsy();

  // Test with ranges
  expect(
    isIPInRangeOrPrivate('8.8.8.8', { ranges: '8.8.8.0/24' })
  ).toBeTruthy();
  expect(isIPInRangeOrPrivate('8.8.4.4', { ranges: '8.8.8.0/24' })).toBeFalsy();
  expect(
    isIPInRangeOrPrivate('192.168.1.1', { ranges: '8.8.8.0/24' })
  ).toBeTruthy(); // Private IP still allowed

  // Test with allowAnyPrivate set to false
  expect(
    isIPInRangeOrPrivate('192.168.1.1', { allowAnyPrivate: false })
  ).toBeFalsy();
  expect(
    isIPInRangeOrPrivate('8.8.8.8', {
      allowAnyPrivate: false,
      ranges: '8.8.8.0/24',
    })
  ).toBeTruthy();
  expect(
    isIPInRangeOrPrivate('10.0.0.1', {
      allowAnyPrivate: false,
      ranges: '8.8.8.0/24',
    })
  ).toBeFalsy();

  // Test with IPv6
  expect(isIPInRangeOrPrivate('fd00::1')).toBeTruthy(); // ULA IPv6
  expect(
    isIPInRangeOrPrivate('2001:db8::1', { ranges: '2001:db8::/32' })
  ).toBeTruthy();
  expect(
    isIPInRangeOrPrivate('2001:db8::1', {
      allowAnyPrivate: false,
      ranges: '2001:db8::/32',
    })
  ).toBeTruthy();

  // Test with multiple ranges
  expect(
    isIPInRangeOrPrivate('172.20.0.1', {
      allowAnyPrivate: false,
      ranges: ['10.0.0.0/8', '172.20.0.0/16'],
    })
  ).toBeTruthy();
});

test('storeIP', function () {
  expect(storeIP('foo')).toBeNull();
  expect(storeIP('::ffff:127.0.0.1')).toEqual('127.0.0.1');
  expect(storeIP('2001:0000:0111:0000:0011:0000:0001:0000')).toEqual(
    '2001:0:111:0:11:0:1:0'
  );
  expect(storeIP('2001:0001:0000:0001:0000:0000:0000:0000')).toEqual(
    '2001:1:0:1::'
  );
  expect(storeIP('0000:0000:0000:0000:0000:0000:0000:0000')).toEqual('::');
  expect(storeIP('0000:0000:0000:0000:0000:0000:0000:0001')).toEqual('::1');
  expect(storeIP('2041:0000:140F:0000:0000:0000:875B:131B')).toEqual(
    '2041:0:140f::875b:131b'
  );
  expect(storeIP('2001:0001:0002:0003:0004:0005:0006:0007')).toEqual(
    '2001:1:2:3:4:5:6:7'
  );
  expect(storeIP('127.0.0.1')).toEqual('127.0.0.1');
  expect(storeIP('::ffff:127.0.0.1')).toEqual(searchIP('::ffff:127.0.0.1'));

  // @ts-ignore: Just testing for unit testing
  expect(storeIP(1)).toBeFalsy();
});

test('displayIP', function () {
  // @ts-ignore: displayIP only takes string, but testing if null is passed in
  expect(displayIP(null)).toEqual('');
  expect(displayIP('::ffff:127.0.0.1')).toEqual('127.0.0.1');
  expect(displayIP('2001:0:111:0:11:0:1:0')).toEqual(
    '2001:0000:0111:0000:0011:0000:0001:0000'
  );
  expect(displayIP('2001:1:0:1::')).toEqual(
    '2001:0001:0000:0001:0000:0000:0000:0000'
  );
  expect(displayIP('::')).toEqual('0000:0000:0000:0000:0000:0000:0000:0000');
  expect(displayIP('::1')).toEqual('0000:0000:0000:0000:0000:0000:0000:0001');
  expect(displayIP('2041:0:140F::875B:131B')).toEqual(
    '2041:0000:140f:0000:0000:0000:875b:131b'
  );
  expect(displayIP('2001:1:2:3:4:5:6:7')).toEqual(
    '2001:0001:0002:0003:0004:0005:0006:0007'
  );
  expect(displayIP('127.0.0.1')).toEqual('127.0.0.1');
});

test('IPFingerprint', function () {
  // IPv4 tests
  expect(IPFingerprint('192.168.1.1')).toEqual('v4:192.168.1.1');
  expect(IPFingerprint('10.0.0.1')).toEqual('v4:10.0.0.1');
  expect(IPFingerprint('8.8.8.8')).toEqual('v4:8.8.8.8');

  // IPv6 tests - should only use first 64 bits (first 4 segments)
  expect(IPFingerprint('2001:db8:1234:5678:abcd:ef01:2345:6789')).toEqual(
    'v6:2001:db8:1234:5678::'
  );
  expect(IPFingerprint('2001:db8::1')).toEqual('v6:2001:db8:0:0::');

  // Special IPv6 addresses
  expect(IPFingerprint('::1')).toEqual('v6:0:0:0:0::');
  expect(IPFingerprint('::')).toEqual('v6:0:0:0:0::');

  // IPv6 ULA (Unique Local Address) range
  expect(IPFingerprint('fd00::1')).toEqual('v6:fd00:0:0:0::');
  expect(IPFingerprint('fdff:ffff:ffff:ffff:ffff:ffff:ffff:ffff')).toEqual(
    'v6:fdff:ffff:ffff:ffff::'
  );
  expect(IPFingerprint('fc00::1')).toEqual('v6:fc00:0:0:0::');

  // IPv6 documentation range
  expect(IPFingerprint('2001:db8::1')).toEqual('v6:2001:db8:0:0::');
  expect(IPFingerprint('2001:db8:ffff:ffff::1')).toEqual(
    'v6:2001:db8:ffff:ffff::'
  );

  // IPv6 global unicast
  expect(IPFingerprint('2001::')).toEqual('v6:2001:0:0:0::');
  expect(IPFingerprint('2001:0:1234:5678:abcd:ef01:2345:6789')).toEqual(
    'v6:2001:0:1234:5678::'
  );

  // IPv4-mapped IPv6 addresses
  expect(IPFingerprint('::ffff:192.168.1.1')).toEqual('v4:192.168.1.1');

  // Invalid IPs
  expect(() => IPFingerprint('not an ip')).toThrow('Invalid IP address');
  expect(() => IPFingerprint('256.256.256.256')).toThrow('Invalid IP address');
});

test('IPFingerprintHashed', async function () {
  try {
    // IPv4 tests
    const hashedIPv4 = await IPFingerprintHashed('192.168.1.1');
    expect(hashedIPv4.startsWith('v4:')).toBeTruthy();
    expect(hashedIPv4).not.toEqual('v4:192.168.1.1');
    expect(hashedIPv4.length).toBeGreaterThan(10); // Should be longer due to hash

    // IPv6 tests
    const hashedIPv6 = await IPFingerprintHashed('2001:db8::1');
    expect(hashedIPv6.startsWith('v6:')).toBeTruthy();
    expect(hashedIPv6).not.toEqual('v6:2001:db8:0:0::');
    expect(hashedIPv6.length).toBeGreaterThan(10); // Should be longer due to hash

    // Make sure different IPs get different hashes
    const hash1 = await IPFingerprintHashed('192.168.1.1');

    // This hash is based on only the IP part (without the 'v4:' prefix)
    expect(hash1).toEqual(
      'v4:c5eb5a4cc76a5cdb16e79864b9ccd26c3553f0c396d0a21bafb7be71c1efcd8c'
    );

    const hash2 = await IPFingerprintHashed('192.168.1.2');
    expect(hash1).not.toEqual(hash2);

    // Make sure same IP always gets same hash
    const hashA = await IPFingerprintHashed('8.8.8.8');
    const hashB = await IPFingerprintHashed('8.8.8.8');
    expect(hashA).toEqual(hashB);
  } catch (error) {
    // If crypto isn't available in the test environment, this will handle the case
    // by making sure the error message is the one we expect
    if (error instanceof Error) {
      expect(error.message).toContain('Crypto functionality not available');
    } else {
      // If it's a different error, fail the test
      throw error;
    }
  }
});
