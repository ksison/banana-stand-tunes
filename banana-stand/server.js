'use strict';
// load da engine
var engine = require('vvps-engine'),
    server = engine.server,
    restify =  engine.restify;

// turn da engine on
engine.bootstrap({
    name: 'test-api',
    version: '0.0.1'
}, function () {

    // default route, return the index.html
    engine.server.get('/', restify.serveStatic({
        directory: './public',
        default: 'index.html'
    }));

    // Route for css, js files
    // FIX js file is served but not used by index... how?
    engine.server.get(/.css|.js/, restify.serveStatic({
        directory: './public/'
    }));

    console.log('Server is online...');
});