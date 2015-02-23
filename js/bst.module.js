'use strict';

var ng = require('angular');

module.exports = ng.module('bst', [])
    .config(require('./bebop.config.js'))
    .run(require('./bebop.run.js'))
    .constant('VERSION', require('../package.json').version);
