///<reference path="../../typings/main.d.ts" />
///<reference path="../../lib/swagger.d.ts" />

import IGenerator = require('./iGenerator');
import GeneratorType = require('./enumGenerator');
import officialGenerator = require('./officialGenerator');
import customGenerator = require('./customGenerator');

export class FactoryGenerator {
    /**
     * Factory to build specific generator (Official or Custom)
     */
    public static GetGenerator(type: GeneratorType.EnumGenerator, grunt: IGrunt): IGenerator.IGenerator {
        switch (type) {
            case GeneratorType.EnumGenerator.OfficialGenerator:
                return new officialGenerator.OfficialGenerator(grunt);

            case GeneratorType.EnumGenerator.CustomGenerator:
                return new customGenerator.CustomGenerator(grunt);

            default:
                break;
        }
    }
}