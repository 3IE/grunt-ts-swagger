# grunt-swagger-ts

Build : 
[![Build Status](https://travis-ci.org/3IE/grunt-ts-swagger.svg?branch=develop)](https://travis-ci.org/3IE/grunt-ts-swagger)

Dependecies : 
[![DevDependencies Status](https://david-dm.org/3IE/grunt-ts-swagger/develop.svg)](https://david-dm.org/3IE/grunt-ts-swagger/develop)


> This plugin generates typescript files from a swagger definition file. This plugin can generates your code in two ways. 
* The first one is the official way from [swagger-js-codegen](https://github.com/wcandillon/swagger-js-codegen). 	
Unfortunately, it doesn't provide a grunt task to generate typescript code, only the javascript generator is available here [grunt-swagger-js-codegen](https://github.com/wcandillon/grunt-swagger-js-codegen)
* The second one is a custom generation because in the official one, when you want to use a server class declaration, their parser shadowes the type with a generic type. With this generation, you can get your Class Definition in a typescript file. 

 

## Getting Started
This plugin requires Grunt v0.4.5

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-swagger-ts --save-dev
```

## The "grunt-ts-swagger" task

### Overview
In your project's Gruntfile, add a section named `swagger_tsGenerator` to the data object passed into `grunt.initConfig()`.
 
#### Official Generator

```js
grunt.initConfig({
  swagger_tsGenerator: {
      default:{
        options: {
            type:'OfficialGenerator',
            apis: [{
                        swagger: 'swagger.json',
                        filename: 'client.ts',
                        module: 'Swagger',
                        className: 'SwaggerClient',
                        typescriptTypesLocation: '../../test/types',
                        angularModuleName: 'swaggerclient',
                        angularServiceName: 'client',
                        type:'typescript'
                    }],
            dest:'tmp'
        }
      }
  },
});
```
##### Options
###### options.api.swagger
Type : 'string'  
Required field to specify swagger location. This location can be an URL or a filepath.

###### others options
The others options are the same as the js plugin

#### Custom Generator  
```js
grunt.initConfig({
         swagger_tsGenerator: {
          default: {
                options: {
                    type:'CustomGenerator',
                    apis: [{
                        swagger: 'http://localhost:15435/swagger/v1/swagger.json',
                        filename: 'serviceReferenceModels.ts',
                        namespace: 'Models',
                        type:'typescript'
                    }],
                    dest:'tmp'
                }
           }
        },
});
```
##### Options
###### options.api.swagger
Type : 'string'  
Required field used to specify swagger location. This location can be an URL or a filepath.

###### options.api.filename
Type : 'string'  
Required field used to specify the generated filename

###### options.api.namespace
Type : 'string'  
Required field used to specify the namespace of the generated class.

###### options.dest
Type : 'string'  
Required field to indicate the output directory.
