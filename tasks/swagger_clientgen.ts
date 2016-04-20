///<reference path="../typings/main.d.ts" />
///<reference path="../lib/swagger.d.ts" />
///<reference path="../lib/sync-request.d.ts" />

/*
 * grunt-swagger-ts
 * https://github.com/3IE/grunt-ts-swagger
 *
 * Copyright (c) 2016 3IE
 */

'use strict';


import fs = require('fs');
import request = require('sync-request');
import Q = require('q');
import _ = require('lodash');
import async = require('async');

import typeGenerators = require('./Generators/enumGenerator');
import interfaceGenerator = require('./Generators/iGenerator');
import factoryGenerator = require('./Generators/factoryGenerator');



module.exports = function (grunt: IGrunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerMultiTask('swagger_tsGenerator', 'Generate client side code out of a swagger api documentation', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        let options = this.options();
        let dest: string = options.dest;
        let typeGenerator: typeGenerators.EnumGenerator = (<any>typeGenerators.EnumGenerator)[options.type];
        let generator: interfaceGenerator.IGenerator = factoryGenerator.FactoryGenerator.GetGenerator(typeGenerator, grunt) ;
        let promises: Array<Q.Promise<{}>> = new Array<Q.Promise<{}>>();


        if (!grunt.file.exists(dest)) {
            grunt.file.mkdir(dest);
        }

        if (!(options.apis instanceof Array)) {
            grunt.log.error('apis must be an array');
            return false;
        }

        options.apis.forEach(api => {
            let deferred: Q.Deferred<{}> = Q.defer();
            let filename: string = api.filename;
            if (api.swagger.substring(0, 'http://'.length) === 'http://' || api.swagger.substring(0, 'https://'.length) === 'https://') {
                try {
                    let res = request('GET', api.swagger);
                    generator.GenerateApi(api, res.getBody(), dest, filename);
                    deferred.resolve();

                } catch (error) {
                    console.log(error);
                    deferred.reject('Error while fetching ' + api.swagger + ': ' + (error));
                }

            } else {
                let data: string = grunt.file.read(api.swagger);
                 generator.GenerateApi(api, data, dest,filename);
                deferred.resolve();
            }
            promises.push(deferred.promise);
        });

        Q.all(promises).then(function () {

        }).catch(function (error) {
            var e;
            if (_.isObject(error) && error.body) {
                e = JSON.stringify(error.body, null, 2);
            } else if (_.isObject(error)) {
                e = JSON.stringify(error, null, 2);
            } else if (error instanceof Error || _.isString(error)) {
                e = error;
            } else {
                e = new Error('Unknown error');
            }
            grunt.fail.fatal(e);
        }).done();
    });
};
