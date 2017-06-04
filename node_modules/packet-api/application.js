var _ = require("lodash");
var pkg = require([__dirname, "package"].join("/"));

function PacketAPI(options){
    this.options = {
        baseUrl: "https://api.packet.net",
        timeout: options.timeout || 20000,
        headers: {
            "User-Agent": [pkg.name, pkg.version].join(" "),
            "X-Auth-Token": options.api_key
        },
        pool: {
            maxSockets: Infinity
        },
        json: true
    }

    this.version = pkg.version;

    var endpoints = [
        "devices",
        "projects",
        "ssh_keys"
    ]

    _.each(endpoints, function(endpoint){
        _.merge(PacketAPI.prototype, require([__dirname, "lib", endpoint].join("/"))(this.options));
    }, this);
}

module.exports = PacketAPI;
