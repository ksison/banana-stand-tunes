'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        browserify: {
            options: {
                browserifyOptions: {
                    debug: true
                }
            },
            bst: {
                src: './banana-stand/app/public/js/bst.js',
                dest: './banana-stand/public/.build/bst.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('build', ['browserify']);
};
