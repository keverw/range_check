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

    // Export public API
    var range_check = {};
    range_check.vaild_ip = vaild_ip;
    range_check.ver = ver;
    module.exports = range_check;
}());