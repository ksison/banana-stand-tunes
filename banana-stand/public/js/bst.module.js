'use strict';

var ng = require('angular');

module.exports = ng.module('bst', [
        require('./common/common-controllers.module').name
    ])
    .config(require('./bst.config.js'))
    .run(require('./bst.run.js'))
    .constant('VERSION', require('../../../package.json').version);
