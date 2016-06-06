///<reference path="../../../typings/index.d.ts" />
///<reference path="../../../lib/swagger.d.ts" />

'use strict';

import Collections = require('typescript-collections');
import Base = require('./baseGenerator');

class MapModelType {
    public name: string;
    public object: swagger.SchemaObject;
}

export class ModelsGenerator extends Base.BaseGenerator {
    private storeModelType: Collections.Dictionary<string, MapModelType>;

    private typeMappings = {
        "integer": "number",
        "long": "number",
        "float": "number",
        "double": "number",
        "byte": "string",
        "string": "string",
        "boolean": "boolean",
        "date": "Date",
        "dateTime": "Date"
    };

    constructor(grunt: IGrunt) {
        super(grunt);
    }


    /**
     * get object properties 
     * @param  {swagger.SchemaObject} schema : object to extract properties from
     * @returns Array : array with properties informations. The items are {name,type, comments}
     */
    private extractProperties(schema: swagger.SchemaObject): Array<any> {
        if (!schema.properties) {
            return;
        }

        let props: Array<any> = [];

        for (let property in schema.properties) {
            let tmpProp = {
                name: property,
                type: this.typeMappings[schema.properties[property].type],
                commentProp: schema.properties[property].description
            };

            if (tmpProp.type === undefined) {
                if (schema.properties[property].type === 'array') {

                    if (schema.properties[property].items.type === undefined) {
                        tmpProp.type = 'Array<' + this.storeModelType.getValue(schema.properties[property].items.$ref).name + '>';
                    }
                    else {
                        tmpProp.type = 'Array<' + this.typeMappings[schema.properties[property].items.type] + '>';
                    }
                }
                
                if (schema.properties[property].type === undefined) {
                    tmpProp.type = this.storeModelType.getValue(schema.properties[property].$ref).name;                    
                }
            }
            props.push(tmpProp);
        }
        return props;
    }
    /**
     * build a dictionnary to associate #key definition and class implementation
     * @param  {Array<string>} objectNames : list of objects in 'definitions' object
     * @param  {SwaggerObject} api : swagger object to access class implementation
     */
    private buildTypeMapping(objectNames: Array<string>, api: SwaggerObject) {
        let that: ModelsGenerator = this;
        this.storeModelType = new Collections.Dictionary<string, MapModelType>();

        objectNames.forEach(function (name: string) {
            let modelType: MapModelType = new MapModelType();
            modelType.name = name;
            modelType.object = api.definitions[name];
            that.storeModelType.setValue('#/definitions/' + name, modelType);
        });
    }

    public generateModels(api: SwaggerObject): string {
        let res: string = '';
        let that: ModelsGenerator = this;
        let objectNames: Array<string> = Object.keys(api.definitions);

        this.buildTypeMapping(objectNames, api);

        objectNames.forEach(function (name: string) {
            let properties: Array<any> = that.extractProperties(api.definitions[name]);

            res += that.render('class.mst', {
                comment: api.definitions[name].description,
                className: name,
                properties: properties
            });
        });

        return res;
    }
}