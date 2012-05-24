(function ()
{
    function vaild_ip(addr)
    {
        var php = require('./php.js');
        return php.inet_pton(addr) !== false;
    }

    function ver(addr)
    {
        var php = require('./php.js');
        if (php.ip2long(addr)) //IPv4
        {
            return 4;
        }
        else //IPv6
        {
            return 6;
        }
    }
	
	function in_range(addr, range)
	{
			if (range.indexOf('/') !== -1)
			{
				var range_data = range.split('/');
				
				var ipaddr = require('ipaddr.js');
				
				var parse_addr = ipaddr.parse(addr);
				var range = ipaddr.parse(range_data[0]);

				console.log(parse_addr);
				
				return parse_addr.match(range, range_data[1]);
			}
			else
			{
				return false;
			}
	}

    // Export public API
    var range_check = {};
    range_check.vaild_ip = vaild_ip;
    range_check.ver = ver;
	range_check.in_range = in_range;
    module.exports = range_check;
}());