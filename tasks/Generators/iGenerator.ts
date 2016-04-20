'use strict';

export interface IGenerator{
    GenerateApi(config:any, content:string, destFolder:string, destFilename:string) : void;
}
