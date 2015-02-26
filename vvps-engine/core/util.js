'use strict';

var util = require('util'),
    fs = require('fs'),
    _ = require('lodash'),
    url = require('url'),
    string = require('string'),
    glob = require('glob'),
    path = require('path');


util._ = _;
util.fs = fs;
util.url = url;
util.path = path;
util.string = string;


/**
 * findPackage - give a directory, it turns it and it's content into a js object
 * @param {string} searchDir
 * @return {object}
 */
util.findPackage = function (searchDir) {
    var packageRoot = {},
        files = glob.sync(path.join(searchDir, '**/*.js'));

    _.forEach(files, function (file) {
        var cleanName = string(path.basename(file, path.extname(file))).camelize().s;

        // find the place in the package structure
        var currentLevel = packageRoot,
            subLevels = string(path.dirname(file)).chompLeft(searchDir).s;
        if (subLevels) {
            subLevels = _.without(subLevels.split(path.sep), '');

            _.forEach(subLevels, function (subLevel) {
                if (!currentLevel[subLevel]) {
                    currentLevel[subLevel] = {};
                }
                currentLevel = currentLevel[subLevel];
            });
        }

        // add the module
        currentLevel[cleanName] = require(file);
    });

    return packageRoot;
};

/**
 * jsonCopy - if a plain object make a deep copy / hacky
 * @param json
 * @returns {*|number}
 */
util.jsonCopy = function (json) {
    if (_.isPlainObject(json)) {
        return JSON.parse(JSON.stringify(json));
    }
};

module.exports = util;