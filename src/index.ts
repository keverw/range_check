import ipaddr from 'ipaddr.js';
// @ts-ignore: Can't find a @types/ip6 package
import ip6 from 'ip6';

export function isIP(addr: string) {
  const ver = version(addr);

  return ver === 4 || ver === 6;
}

export function version(addr: string): number {
  try {
    const parse_addr = ipaddr.parse(addr);
    const kind = parse_addr.kind();

    if (kind === 'ipv4') {
      if (ipaddr.IPv4.isValidFourPartDecimal(addr)) {
        return 4; //IPv4
      } else {
        return 0; //not 4 or 6
      }
    } else if (kind === 'ipv6') {
      return 6; //IPv6
    } else {
      /* istanbul ignore next */
      return 0; //not 4 or 6
    }
  } catch (err) {
    return 0; //not 4 or 6
  }
}

export function isV4(addr: string) {
  return version(addr) === 4;
}

export function isV6(addr: string) {
  return version(addr) === 6;
}

export function isRange(range: string) {
  try {
    ipaddr.parseCIDR(range);
    return true;
  } catch (err) {
    return false;
  }
}

export function inRange(addr: string, range: string | string[]) {
  if (typeof range === 'string') {
    if (range.indexOf('/') !== -1) {
      try {
        const range_data = range.split('/');

        const parse_addr = ipaddr.parse(addr);
        const parse_range = ipaddr.parse(range_data[0]);

        //@ts-ignore:  It works.
        return parse_addr.match(parse_range, range_data[1]);
      } catch (err) {
        return false;
      }
    } else {
      addr = isV6(addr) ? ip6.normalize(addr) : addr; //v6 normalize addr
      range = isV6(range) ? ip6.normalize(range) : range; //v6 normalize range

      return isIP(range as string) && addr === range;
    }
  } else if (range && typeof range === 'object') {
    //list
    for (const check_range in range) {
      if (inRange(addr, range[check_range]) === true) {
        return true;
      }
    }
    return false;
  } else {
    return false;
  }
}

export function isPrivateIP(ip: string): boolean {
  try {
    const addr = ipaddr.parse(ip);
    const kind = addr.kind();
    const range = addr.range();

    if (kind === 'ipv4') {
      return range === 'private' || range === 'loopback' || ip === '127.0.0.1';
    } else if (kind === 'ipv6') {
      if (range === 'ipv4Mapped') {
        const ipv4 = (addr as ipaddr.IPv6).toIPv4Address();
        return (
          ipv4.range() === 'private' ||
          ipv4.range() === 'loopback' ||
          ip === '127.0.0.1'
        );
      } else {
        return range === 'uniqueLocal' || range === 'loopback' || ip === '::1';
      }
    }

    return false;
  } catch (err) {
    return false;
  }
}

export function isIPInRangeOrPrivate(
  ip: string,
  options: {
    ranges?: string[] | string;
    allowAnyPrivate?: boolean;
  } = { allowAnyPrivate: true }
) {
  if (options.allowAnyPrivate !== false && isPrivateIP(ip)) {
    return true;
  }

  if (options.ranges) {
    return inRange(ip, options.ranges);
  }

  return false;
}

export function storeIP(addr: string) {
  try {
    var parse_addr = ipaddr.parse(addr);
    var kind = parse_addr.kind();

    if (kind === 'ipv4') {
      //is a plain v4 address
      return addr;
    } else if (kind === 'ipv6') {
      //@ts-ignore:  it exists!
      if (parse_addr.isIPv4MappedAddress()) {
        //convert v4 mapped to v6 addresses to a v4 in it's original format
        //@ts-ignore:  it exists!
        return parse_addr.toIPv4Address().toString();
      } //is a v6, abbreviate it
      else {
        return ip6.abbreviate(addr);
      }
    } else {
      return null; //invalid IP address
    }
  } catch (err) {
    return null; //invalid IP address
  }
}

// searchIP is a aliases of storeIP
export { storeIP as searchIP };

export function displayIP(addr: string) {
  try {
    var parse_addr = ipaddr.parse(addr);
    var kind = parse_addr.kind();

    if (kind === 'ipv4') {
      //is a plain v4 address
      return addr;
    } else if (kind === 'ipv6') {
      //@ts-ignore:  it exists!
      if (parse_addr.isIPv4MappedAddress()) {
        //convert v4 mapped to v6 addresses to a v4 in it's original format
        //@ts-ignore:  it exists!
        return parse_addr.toIPv4Address().toString();
      } //is a v6, normalize it
      else {
        return ip6.normalize(addr);
      }
    } else {
      return ''; //invalid IP address
    }
  } catch (err) {
    return ''; //invalid IP address
  }
}
