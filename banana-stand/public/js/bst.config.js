'use strict';

module.exports = ['$locationProvider',
    function($locationProvider) {

        // Enable html5 mode which allows for routes to be handled without a hash symbol.
        $locationProvider.html5Mode({
            enabled: true
        });
    }
];
