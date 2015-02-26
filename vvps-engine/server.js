'use strict';

var util = require('./core/util'),
    nconf = require('nconf'),
    mongoose = require('mongoose'),
    restify = require('restify');

module.exports.util = util;
module.exports.config = nconf;
module.exports.mongoose = mongoose;
module.exports.restify = restify;
module.exports.controllers = util.findPackage(util.path.join(__dirname, 'controllers'));

/**
 * bootstrap - sets up a server for a project.
 * @param {object} config - current properties name & version
 * @param {function} callback - callback at end of setup
 * @returns {*}
 */
module.exports.bootstrap = function (config, callback) {
    var server = require('./core/server')(config, callback),

        connectionString = nconf.get('DB_URI'); // set in app configs

    if (connectionString) {
        mongoose.connect(connectionString);
    }

    return server;
};
