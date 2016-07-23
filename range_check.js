(function ()
{
	var ipaddr = require('ipaddr.js'),
		ip6 = require('ip6');

	function isIP(addr)
	{
		return ipaddr.isValid(addr);
	}

	function isRange(range)
	{
		try {
			var cidr = ipaddr.parseCIDR(range);
			return true;
		} catch(err) {
			return false;
		}

	}

	function ver(addr)
	{
		try {
			var parse_addr = ipaddr.parse(addr);
			var kind = parse_addr.kind();

			if (kind === 'ipv4')
			{
				return 4; //IPv4
			}
			else if (kind === 'ipv6')
			{
				return 6; //IPv6
			}
			else
			{
				return 0; //not 4 or 6
			}

		}
		catch(err) {
			return 0; //not 4 or 6
		}

	}

	function isV4(addr)
	{
		return (ver(addr) === 4);
	}

	function isV6(addr)
	{
		return (ver(addr) === 6);
	}

	function storeIP(addr)
	{
		try {
			var parse_addr = ipaddr.parse(addr);
			var kind = parse_addr.kind();

			if (kind === 'ipv4') //is a plain v4 address
			{
				return addr;
			}
			else if (kind === 'ipv6')
			{
				if (parse_addr.isIPv4MappedAddress()) //convert v4 mapped to v6 addresses to a v4 in it's original format
				{
					return parse_addr.toIPv4Address().toString();
				}
				else //is a v6, abbreviate it
				{
					return ip6.abbreviate(addr);
				}

			}
			else
			{
				return null; //invalid IP address
			}

		}
		catch(err) {
			return null; //invalid IP address
		}

	}

	function displayIP(addr)
	{
		try {
			var parse_addr = ipaddr.parse(addr);
			var kind = parse_addr.kind();

			if (kind === 'ipv4') //is a plain v4 address
			{
				return addr;
			}
			else if (kind === 'ipv6')
			{
				if (parse_addr.isIPv4MappedAddress()) //convert v4 mapped to v6 addresses to a v4 in it's original format
				{
					return parse_addr.toIPv4Address().toString();
				}
				else //is a v6, normalize it
				{
					return ip6.normalize(addr);
				}

			}
			else
			{
				return ''; //invalid IP address
			}

		}
		catch(err) {
			return ''; //invalid IP address
		}

	}

	function inRange(addr, range)
	{
		if (typeof range === 'string')
		{
			if (range.indexOf('/') !== -1)
			{
				try {
					var range_data = range.split('/');

					var parse_addr = ipaddr.parse(addr);
					var parse_range = ipaddr.parse(range_data[0]);

					return parse_addr.match(parse_range, range_data[1]);
				}
				catch(err) {
					return false;
				}
			}
			else
			{
				addr = (isV6(addr)) ? ip6.normalize(addr) : addr; //v6 normalize addr
				range = (isV6(range)) ? ip6.normalize(range) : range; //v6 normalize range

				return isIP(range) && addr === range;
			}
		}
		else if (range && typeof range === 'object') //list
		{
			for (var check_range in range)
			{
				if (inRange(addr, range[check_range]) === true)
				{
					return true;
				}
			}
			return false;
		}
		else
		{
			return false;
		}
	}

	// Export public API
	var range_check = {};
	//Validate IP Address
	range_check.vaild_ip = range_check.vaildIp = isIP;
	range_check.valid_ip = range_check.validIp = isIP;
	range_check.isIP = isIP;

	//isV4 and isV6
	range_check.isV4 = isV4;
	range_check.isV6 = isV6;

	//storeIP, searchIP and displayIP
	range_check.storeIP = storeIP;
	range_check.searchIP = storeIP;
	range_check.displayIP = displayIP;

	//Validate Range
	range_check.valid_range = range_check.validRange = isRange;
	range_check.isRange = isRange;

	//Others
	range_check.ver = ver;
	range_check.in_range = range_check.inRange = inRange;

	module.exports = range_check;
}());
