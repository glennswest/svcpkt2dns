var _ = require("lodash");
var request = require("request");

module.exports = function(options){

    return {

        get_devices: function(project_id, fn){
            var request_options = _.defaults({
                url: ["", "projects", project_id, "devices"].join("/"),
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
        },

        create_device: function(project_id, body, fn){
            var request_options = _.defaults({
                url: ["", "projects", project_id, "devices"].join("/"),
                method: "POST",
                json: body
            }, _.clone(options));

            request(request_options, function(err, response){
                if(err)
                    return fn(err);
                else if(response.statusCode != 201){
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
        },

        get_device: function(device_id, fn){
            var request_options = _.defaults({
                url: ["", "devices", device_id].join("/"),
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
        },

        update_device: function(device_id, body, fn){
            var request_options = _.defaults({
                url: ["", "devices", device_id].join("/"),
                method: "PATCH",
                json: body
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
        },

        delete_device: function(device_id, fn){
            var request_options = _.defaults({
                url: ["", "devices", device_id].join("/"),
                method: "DELETE"
            }, _.clone(options));

            request(request_options, function(err, response){
                if(err)
                    return fn(err);
                else if(response.statusCode != 204){
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
        },

        get_facilities: function(fn){
            var request_options = _.defaults({
                url: "/facilities",
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
        },

        get_operating_systems: function(fn){
            var request_options = _.defaults({
                url: "/operating-systems",
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
        },

        get_plans: function(fn){
            var request_options = _.defaults({
                url: "/plans",
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
