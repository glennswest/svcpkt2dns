var _ = require("lodash");
var request = require("request");

module.exports = function(options){

    return {

        get_ssh_keys: function(fn){
            var request_options = _.defaults({
                url: "/ssh-keys",
                method: "GET"
            }, _.clone(options));

            request(request_options, function(err, response){
                if(err)
                    return fn(err);
                else if(response.statusCode != 200){
                    if(_.isObject(response.body) && _.has(response.body, "error"))
                        return fn(new Error(response.body.error));
                    else if(_.isObject(response.body) && _.has(response.body, "errors"))
                        return fn(new Error(response.body.errors.join(", ")));
                    else
                        return fn(new Error(response.body));
                }
                else
                    return fn(null, response.body);
            });
        }

    }

}
