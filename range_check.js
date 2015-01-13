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

    function ver(addr)
    {
        return ipaddr.parse(addr).kind().replace(/ipv/g, '');
    }

    function in_range(addr, range)
    {
        if (typeof (range) === 'string')
        {
            if (range.indexOf('/') !== -1)
            {
                var range_data = range.split('/');
                
                var parse_addr = ipaddr.parse(addr);
                var parse_range = ipaddr.parse(range_data[0]);

                return parse_addr.match(parse_range, range_data[1]);
            }
            else
            {
                return false;
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
    range_check.ver = ver;
    range_check.in_range = range_check.inRange = in_range;
    module.exports = range_check;
}());