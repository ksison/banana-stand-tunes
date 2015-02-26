var config = require('../server').config,
    server = require('../server').server,
    _ = require('../server').util._;

/**
 *
 * @param {string} r - route represented as a uri i.e: 'items/:id'
 * @param method
 * @param handler
 * @returns {*}
 */
function prepRoutes(r, method, handler) {
    switch (method) {
        case 'GET':
            return server.get(r, handler);
        case 'POST':
            return server.post(r, handler);
        case 'PUT':
            return server.put(r, handler);
        case 'PATCH':
            return server.patch(r, handler);
        case 'DELETE':
            return server.del(r, handler);
        case 'HEAD':
            return server.head(r, handler);
        case 'OPTIONS':
            return server.opts(r, handler);
        default:
            break;
    }
}


module.exports = function (controllers) {
    var routes = config.get('RESOURCES');
    _.forEach(routes, function (resource) {

        var controller = controllers[resource.CONTROLLER];
        if (controller) {
            for (var r in resource.ROUTES) {

                var route = resource.ROUTES[r];

                if (Array.isArray(route)) {
                    _.forEach(route, function (element) {
                        prepRoutes(r, element.METHOD, controller[element.VALUE])
                    });
                } else {
                    prepRoutes(r, route.METHOD, controller[route.VALUE]);
                }
            }
        }
    });
};