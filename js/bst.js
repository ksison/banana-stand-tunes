'use strict';

var ng = require('angular');

// Manual initialization of Angular.
ng.element(document).ready(function () {
    ng.bootstrap(document, [
        require('./bst.module').name
    ]);
});
