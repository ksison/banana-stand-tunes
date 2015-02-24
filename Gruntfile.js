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
                src: 'js/bst.js',
                dest: '.build/bst.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('build', ['browserify']);
};
