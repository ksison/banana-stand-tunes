'use strict';

var ng = require('angular');

// Manual initialization of Angular.
ng.element(document).ready(function () {
    console.log('here');
    ng.bootstrap(document, [
        require('./bst.module.js').name
    ]);
});
