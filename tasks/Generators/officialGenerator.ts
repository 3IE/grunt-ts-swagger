///<reference path="../../typings/main.d.ts" />
///<reference path="../../lib/swagger.d.ts" />
///<reference path="../../lib/sync-request.d.ts" />

import IGenerator = require('./iGenerator');
import fs = require('fs');

/**
 * uses parser and template from https://github.com/wcandillon/swagger-js-codegen
 */
export class OfficialGenerator implements IGenerator.IGenerator {
    private grunt: IGrunt;

    constructor(grunt: IGrunt) {
        this.grunt = grunt;
    }

    public GenerateApi(config: any, content: string, destFolder: string, destFilename: string): void {
        var CodeGen = require('swagger-js-codegen').CodeGen;
        var swagger = JSON.parse(content);
        let source:string = '';

        if (config.type === 'typescript') {
            source = CodeGen.getTypescriptCode({ moduleName: config.moduleName, className: config.className, swagger: swagger });
        } else if (config.custom === true) {
            source = CodeGen.getCustomCode({
                className: config.className, swagger: swagger, mustache: config.mustache,
                template: {
                    class: fs.readFileSync(config.template.class, 'utf-8'),
                    method: fs.readFileSync(config.template.method, 'utf-8'),
                    request: fs.readFileSync(config.template.request, 'utf-8')
                }
            });
        } else {
            source = CodeGen.getNodeCode({ className: config.className, swagger: swagger });
        }
        this.grunt.log.writeln('Generated ' + destFilename + ' from ' + config.swagger);
        fs.writeFileSync(destFolder + '/' + destFilename, source, 'UTF-8');
    }
}
