///<reference path="../../typings/index.d.ts" />
///<reference path="../../lib/swagger.d.ts" />

import IGenerator = require('./iGenerator');
import ModelsGenerator = require('./Custom/modelsGenerator');
import ModulesGenerator = require('./Custom/modulesGenerator');

/**
 * Uses customs parsers and generators in order to adapt to our needs
 */
export class CustomGenerator implements IGenerator.IGenerator {
    private grunt: IGrunt;

    constructor(grunt: IGrunt) {
        this.grunt = grunt;
    }
    public GenerateApi(config: any, content: string, destFolder: string, destFilename: string): void {

        let swagger: SwaggerObject = JSON.parse(content);
        let targetExportFile: string = destFolder + '/' + destFilename;

        if (config.type === 'typescript') {
            // load models Generators
            let modelsGenerator: ModelsGenerator.ModelsGenerator = new ModelsGenerator.ModelsGenerator(this.grunt);
            // load namespaces Generators
            let modulesGenerator: ModulesGenerator.ModulesGenerator = new ModulesGenerator.ModulesGenerator(this.grunt);

            let modelsContent: string = modelsGenerator.generateModels(swagger);
            let namespaceContent: string = modulesGenerator.generateModels(config.namespace, modelsContent);
            this.grunt.file.write(targetExportFile, namespaceContent, { encoding: 'utf8' });
        }
    }
}