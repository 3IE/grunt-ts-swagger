/*
 * grunt-swagger-ts
 * https://github.com/3IE/grunt-ts-swagger
 *
 * Copyright (c) 2016 3IE
 */

'use strict';

module.exports = function (grunt) {
    // load all npm grunt tasks
    require('jit-grunt')(grunt, {
	});
    // Project configuration.
    grunt.initConfig({

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        //use unix style lineendings in expected files as bracktes creates windows line endings but our plugin creates unix style ones.
        lineending: { // Task
            dist: { // Target
                options: { // Target options
                    eol: 'crlf',
                    overwrite: true
                },
                files: { // Files to process
                    '': ['test/expected/*']
                }
            }
        },

        ts: {
            default: {
                src: ['tasks/**/*.ts'],
                options: {
                    target: 'es5',
                    module: 'commonjs',
                    noEmitOnError: true,
                    fast: 'never'
                }
            }
        },

        // Configuration to be run (and then tested).
        swagger_tsGenerator: {
            official: {
                options: {
                    type: 'OfficialGenerator',
                    apis: [{
                        swagger: 'swagger.json',
                        filename: 'client.ts',
                        module: 'Swagger',
                        className: 'SwaggerClient',
                        typescriptTypesLocation: '../../test/types',
                        angularModuleName: 'swaggerclient',
                        angularServiceName: 'client',
                        type: 'typescript'
                    }],
                    dest: 'tmp'
                }
            },
            custom: {
                options: {
                    type: 'CustomGenerator',
                    apis: [{
                        swagger: 'swagger.json',
                        filename: 'serviceReferenceModels.ts',
                        namespace: 'Models',
                        type: 'typescript'
                    }],
                    dest: 'tmp'
                }
            }
        },


    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'lineending', 'OfficialTest', 'typescript']);
    grunt.registerTask('generate', ['clean', 'lineending', 'OfficialTest']);
    grunt.registerTask('build', ['ts']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['build']);

    // Tasks to test the swagger_tsGenerator 
    grunt.registerTask('OfficialTest', ['swagger_tsGenerator:official']);
    grunt.registerTask('CustomTest', ['swagger_tsGenerator:custom']);

};
