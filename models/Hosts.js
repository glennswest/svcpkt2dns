module.exports = function()
{
        this.hasOne('ipaddrs');
        this.autoJoin('ipaddrs');
}

