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

    engine.server.pre(restify.pre.sanitizePath()); // sanitize paths (e.g. "/admin/" will result in "/admin")
    engine.server.use(restify.bodyParser()); // body parser

    // route for static files
    engine.server.get(/\/?.*/, restify.serveStatic({
        "default":   'index.html',
        "directory": ".banana-stand/public"
    }));

    console.log('Server is online...');
});