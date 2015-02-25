'use strict';

var restify = require('restify'),
    engine = require('../server'),
    util = require('./util'),
    nconf = require('nconf'),
    env = process.env.NODE_ENV || 'default',
    controllerUri = '/app/controllers',
    configPath = __dirname + '/config/environments/',
    appConfigPath = process.cwd() + '/config/environments/';

// do config loads.
nconf
    .env()
    .argv()
    .file(env, appConfigPath + env + '.json')
    .file('default', appConfigPath + 'default.json')
    .file(env + 'Engine', configPath + env + '.json')
    .file('defaultEngine', configPath + 'default.json');

/**
 *
 * @param {object} config - current properties name & version
 * @param {function} cb - callback at end of setup
 * @returns {*}
 */

module.exports = function (config, cb) {
    // check if server has been initialized
    if (typeof engine !== 'undefined' && typeof engine !== null) {

        config = config || {
            name: 'vvps-api',
            version: '0.0.1'
        };

        engine.server = restify.createServer(config);

        // Do server setups
        // TODO: Figure out appropriate setups.
        engine.server
            .use(restify.fullResponse())
            .use(restify.bodyParser());

        // get controllers
        var controllers = util.findPackage(process.cwd() + controllerUri);

        // route controllers to routes
        require('./router')(controllers, engine.server);

        engine.server.listen(nconf.get('SERVER_PORT'), function () {
            if (typeof cb === 'function') {
                cb();
            }
        });

        return engine.server;
    }
};
