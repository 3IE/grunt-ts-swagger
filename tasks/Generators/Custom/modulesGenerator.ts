///<reference path="../../../typings/main.d.ts" />
///<reference path="../../../lib/swagger.d.ts" />

'use strict';

import Base = require('./baseGenerator');

export class ModulesGenerator extends Base.BaseGenerator {

    constructor(grunt: IGrunt) {
        super(grunt);
    }

    public generateModels(namespaceName: string, content: string): string {

        let res: string = this.render('namespace.mst', {
            namespaceName: namespaceName,
            content: content
        });

        return res;
    }
}