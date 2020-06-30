"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayIP = exports.searchIP = exports.storeIP = exports.inRange = exports.isRange = exports.isV6 = exports.isV4 = exports.version = exports.isIP = void 0;
var ipaddr_js_1 = __importDefault(require("ipaddr.js"));
// @ts-ignore: Can't find a @types/ip6 package
var ip6_1 = __importDefault(require("ip6"));
function isIP(addr) {
    return ipaddr_js_1.default.isValid(addr);
}
exports.isIP = isIP;
function version(addr) {
    try {
        var parse_addr = ipaddr_js_1.default.parse(addr);
        var kind = parse_addr.kind();
        if (kind === 'ipv4') {
            return 4; //IPv4
        }
        else if (kind === 'ipv6') {
            return 6; //IPv6
        }
        else {
            /* istanbul ignore next */
            return 0; //not 4 or 6
        }
    }
    catch (err) {
        return 0; //not 4 or 6
    }
}
exports.version = version;
function isV4(addr) {
    return version(addr) === 4;
}
exports.isV4 = isV4;
function isV6(addr) {
    return version(addr) === 6;
}
exports.isV6 = isV6;
function isRange(range) {
    try {
        var cidr = ipaddr_js_1.default.parseCIDR(range);
        return true;
    }
    catch (err) {
        return false;
    }
}
exports.isRange = isRange;
function inRange(addr, range) {
    if (typeof range === 'string') {
        if (range.indexOf('/') !== -1) {
            try {
                var range_data = range.split('/');
                var parse_addr = ipaddr_js_1.default.parse(addr);
                var parse_range = ipaddr_js_1.default.parse(range_data[0]);
                //@ts-ignore:  It works.
                return parse_addr.match(parse_range, range_data[1]);
            }
            catch (err) {
                return false;
            }
        }
        else {
            addr = isV6(addr) ? ip6_1.default.normalize(addr) : addr; //v6 normalize addr
            range = isV6(range) ? ip6_1.default.normalize(range) : range; //v6 normalize range
            return isIP(range) && addr === range;
        }
    }
    else if (range && typeof range === 'object') {
        //list
        for (var check_range in range) {
            if (inRange(addr, range[check_range]) === true) {
                return true;
            }
        }
        return false;
    }
    else {
        return false;
    }
}
exports.inRange = inRange;
function storeIP(addr) {
    try {
        var parse_addr = ipaddr_js_1.default.parse(addr);
        var kind = parse_addr.kind();
        if (kind === 'ipv4') {
            //is a plain v4 address
            return addr;
        }
        else if (kind === 'ipv6') {
            //@ts-ignore:  it exists!
            if (parse_addr.isIPv4MappedAddress()) {
                //convert v4 mapped to v6 addresses to a v4 in it's original format
                //@ts-ignore:  it exists!
                return parse_addr.toIPv4Address().toString();
            } //is a v6, abbreviate it
            else {
                return ip6_1.default.abbreviate(addr);
            }
        }
        else {
            return null; //invalid IP address
        }
    }
    catch (err) {
        return null; //invalid IP address
    }
}
exports.storeIP = storeIP;
exports.searchIP = storeIP;
function displayIP(addr) {
    try {
        var parse_addr = ipaddr_js_1.default.parse(addr);
        var kind = parse_addr.kind();
        if (kind === 'ipv4') {
            //is a plain v4 address
            return addr;
        }
        else if (kind === 'ipv6') {
            //@ts-ignore:  it exists!
            if (parse_addr.isIPv4MappedAddress()) {
                //convert v4 mapped to v6 addresses to a v4 in it's original format
                //@ts-ignore:  it exists!
                return parse_addr.toIPv4Address().toString();
            } //is a v6, normalize it
            else {
                return ip6_1.default.normalize(addr);
            }
        }
        else {
            return ''; //invalid IP address
        }
    }
    catch (err) {
        return ''; //invalid IP address
    }
}
exports.displayIP = displayIP;
//# sourceMappingURL=range-check.js.map