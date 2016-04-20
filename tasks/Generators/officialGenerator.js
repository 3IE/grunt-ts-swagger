"use strict";
var fs = require('fs');
var OfficialGenerator = (function () {
    function OfficialGenerator(grunt) {
        this.grunt = grunt;
    }
    OfficialGenerator.prototype.GenerateApi = function (config, content, destFolder, destFilename) {
        var CodeGen = require('swagger-js-codegen').CodeGen;
        var swagger = JSON.parse(content);
        var source = '';
        if (config.type === 'typescript') {
            source = CodeGen.getTypescriptCode({ moduleName: config.moduleName, className: config.className, swagger: swagger });
        }
        else if (config.custom === true) {
            source = CodeGen.getCustomCode({
                className: config.className, swagger: swagger, mustache: config.mustache,
                template: {
                    class: fs.readFileSync(config.template.class, 'utf-8'),
                    method: fs.readFileSync(config.template.method, 'utf-8'),
                    request: fs.readFileSync(config.template.request, 'utf-8')
                }
            });
        }
        else {
            source = CodeGen.getNodeCode({ className: config.className, swagger: swagger });
        }
        this.grunt.log.writeln('Generated ' + destFilename + ' from ' + config.swagger);
        fs.writeFileSync(destFolder + '/' + destFilename, source, 'UTF-8');
    };
    return OfficialGenerator;
}());
exports.OfficialGenerator = OfficialGenerator;
//# sourceMappingURL=officialGenerator.js.map