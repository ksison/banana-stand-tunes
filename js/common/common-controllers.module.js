'use strict';

var ng = require('angular');

module.exports = ng.module('bst.common.controllers', [])
    .controller('MasterController', require('./controllers/master.controller'));
