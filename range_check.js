(function ()
{
    function vaild_ip(addr)
    {
		var php = require('./php.js');
		return php.inet_pton(addr) !== false;
    }
	
    // Export public API
    var range_check = {};
    range_check.vaild_ip = vaild_ip;
    module.exports = range_check;
}());