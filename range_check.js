(function ()
{
	var ipaddr = require('ipaddr.js');
	
	function valid_ip(addr)
	{
		return ipaddr.isValid(addr);
	}
	
	function vaild_ip(addr) //backwords capataibity for typo version
	{
		return valid_ip(addr);
	}

	function valid_range(range)
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

			if (kind == 'ipv4')
			{
				return 4; //IPv4
			}
			else if (kind == 'ipv6')
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

	function in_range(addr, range)
	{
		if (typeof (range) === 'string')
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
				return vaild_ip(range) && addr === range;
			}
		}
		else if (typeof (range) === 'object') //list
		{
			for (var check_range in range)
			{
				if (in_range(addr, range[check_range]) === true)
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
	range_check.vaild_ip = range_check.vaildIp = valid_ip;
	range_check.valid_ip = range_check.validIp = valid_ip;
	range_check.valid_range = range_check.validRange = valid_range;
	range_check.ver = ver;
	range_check.in_range = range_check.inRange = in_range;
	module.exports = range_check;
}());
