///<reference path="../../../typings/main.d.ts" />
///<reference path="../../../lib/swagger.d.ts" />

'use strict';


var Mustache: MustacheStatic = require('mustache');

export class BaseGenerator {
    private grunt: IGrunt;
    private language: string;

    constructor(grunt: IGrunt) {
        this.grunt = grunt;
        this.language = 'typescript';
    }

    public findTemplateFile(templateFile: string): string {
        let templatePath: string = '';

        templatePath = __dirname + '/templates/' + this.language + '/' + templateFile;

        if (this.grunt.file.exists(templatePath)) {
            return templatePath;
        }

        this.grunt.log.error('Template file ' + templatePath + ' not found');
    }

    public render(templateFile: string, data: any): string {
        let templatePath: string = this.findTemplateFile(templateFile);

        if (!templatePath) {
            return '';
        }

        return Mustache.render(this.grunt.file.read(templatePath), data);
    }
}