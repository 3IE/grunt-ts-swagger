/**
 *Type definitions for swagger 2.0
 */
interface SwaggerObject {
    /**
     *Specifies the Swagger Specification version being used.It can be used by the Swagger UI and other clients to interpret the API listing.The value MUST be "2.0".
     */
    swagger: string;
    /**
     *Provides metadata about the API.The metadata can be used by the clients if needed.
     */
    info: swagger.InfoObject;
    /**
     *The available paths and operations for the API.
     */
    paths: swagger.PathsObject;
    /**
     *The host(name or ip) serving the API.This MUST be the host only and does not include the scheme nor sub - paths.It MAY include a port.If the host is not included, the host serving the documentation is to be used(including the port).The host does not support path templating.
     */
    host?: string;
    /**
     *The base path on which the API is served, which is relative to the host.If it is not included, the API is served directly under the host.The value MUST start with a leading slash(/).The basePath does not support path templating.
     */
    basePath?: string;
    /**
     *The transfer protocol of the API.Values MUST be from the list: "http", "https", "ws", "wss".If the schemes is not included, the default scheme to be used is the one used to access the specification.
     */
    schemes?: Array<string>;
    /**
     *A list of MIME types the APIs can consume.This is global to all APIs but can be overridden on specific API calls.Value MUST be as described under Mime Types.
     */
    consumes?: Array<string>;
    /**
     *A list of MIME types the APIs can produce.This is global to all APIs but can be overridden on specific API calls.Value MUST be as described under Mime Types.
     */
    produces?: Array<string>;
    /**
     *Definitions Object  An object to hold data types produced and consumed by operations.
     */
    definitions?: swagger.DefinitionsObject;
    /**
     *An object to hold parameters that can be used across operations.This property does not define global parameters for all operations.
     */
    parameters?: swagger.ParametersDefinitionsObject;
    /**
     *An object to hold responses that can be used across operations.This property does not define global responses for all operations.
     */
    responses?: swagger.ResponsesDefinitionsObject;
    /**
     *Security scheme definitions that can be used across the specification.
     */
    securityDefinitions?: swagger.SecurityDefinitionsObject;
    /**
     *A declaration of which security schemes are applied for the API as a whole.The list of values describes alternative security schemes that can be used(that is, there is a logical OR between the security requirements).Individual operations can override this definition.
     */
    security?: Array<swagger.SecurityRequirementObject>;
    /**
     *A list of tags used by the specification with additional metadata.The order of the tags can be used to reflect on their order by the parsing tools.Not all tags that are used by the Operation Object must be declared.The tags that are not declared may be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.
     */
    tags?: Array<swagger.TagObject>;
    /**
     *Additional external documentation.
     */
    externalDocs?: swagger.ExternalDocumentationObject;
}

declare module swagger {
    export interface InfoObject {
        /**
         *The title of the application.
         */
        title: string;
        /**
         *Provides the version of the application API (not to be confused by the specification version).
         */
        version: string;
        /**
         *A short description of the application. GFM syntax can be used for rich text representation.
         */
        description?: string;
        /**
         *The Terms of Service for the API.
         */
        termsOfService?: string;
        /**
         *The contact information for the exposed API.
         */
        contact?: ContactObject;
        /**
         *The license information for the exposed API.
         */
        license?: LicenseObject;

    }

    /**
     *Holds the relative paths to the individual endpoints. The path is appended to the basePath in order to construct the full URL. The Paths may be empty, due to ACL constraints.
     */
    export interface PathsObject {
        [path: string]: PathItemObject;
    }

    export interface PathItemObject {
        /**
         *Allows for an external definition of this path item.The referenced structure MUST be in the format of a Path Item Object.If there are conflicts between the referenced definition and this Path Item's definition, the behavior is undefined.
         */
        $ref?: string;
        /**
         *A definition of a GET operation on this path.
         */
        get?: OperationObject;
        /**
         *A definition of a PUT operation on this path.
         */
        put?: OperationObject;
        /**
         *A definition of a POST operation on this path.
         */
        post?: OperationObject;
        /**
         *A definition of a DELETE operation on this path.
         */
            delete?: OperationObject;
        /**
         *A definition of a OPTIONS operation on this path.
         */
        options?: OperationObject;
        /**
         *A definition of a HEAD operation on this path.
         */
        head?: OperationObject;
        /**
         *A definition of a PATCH operation on this path.
         */
        patch?: OperationObject;
        /**
         *A list of parameters that are applicable for all the operations described under this path.These parameters can be overridden at the operation level, but cannot be removed there.The list MUST NOT include duplicated parameters.A unique parameter is defined by a combination of a name and location.The list can use the Reference Object to link to parameters that are defined at the Swagger Object's parameters. There can be one "body" parameter at most.
         */
        parameters?: Array<ParameterObject>;
    }

    /**
     *Describes a single API operation on a path.
     */
    export interface OperationObject {
        /**
         *A list of tags for API documentation control.Tags can be used for logical grouping of operations by resources or any other qualifier.
         */
        tags?: Array<string>;
        /**
         *A short summary of what the operation does.For maximum readability in the swagger - ui, this field SHOULD be less than 120 characters.
         */
        summary?: string;
        /**
         *A verbose explanation of the operation behavior.GFM syntax can be used for rich text representation.
         */
        description?: string;
        /**
         *Additional external documentation for this operation.
         */
        externalDocs?: ExternalDocumentationObject;
        /**
         *A friendly name for the operation.The id MUST be unique among all operations described in the API.Tools and libraries MAY use the operation id to uniquely identify an operation.
         */
        operationId?: string;
        /**
         *A list of MIME types the operation can consume.This overrides the[consumes](#swaggerConsumes) definition at the Swagger Object.An empty value MAY be used to clear the global definition.Value MUST be as described under Mime Types.
         */
        consumes?: Array<string>;
        /**
         *A list of MIME types the operation can produce.This overrides the[produces](#swaggerProduces) definition at the Swagger Object.An empty value MAY be used to clear the global definition.Value MUST be as described under Mime Types.
         */
        produces?: Array<string>;
        /**
         *A list of parameters that are applicable for this operation.If a parameter is already defined at the Path Item, the new definition will override it, but can never remove it.The list MUST NOT include duplicated parameters.A unique parameter is defined by a combination of a name and location.The list can use the Reference Object to link to parameters that are defined at the Swagger Object's parameters. There can be one "body" parameter at most.
         */
        parameters?: Array<ParameterObject>;
        /**
         *Required.The list of possible responses as they are returned from executing this operation.
         */
        responses: ResponsesObject;
        /**
         *The transfer protocol for the operation.Values MUST be from the list: "http", "https", "ws", "wss".The value overrides the Swagger Object schemes definition.
         */
        schemes?: Array<string>;
        /**
         *Declares this operation to be deprecated.Usage of the declared operation should be refrained.Default value is false.
         */
        deprecated?: boolean;
        /**
         *A declaration of which security schemes are applied for this operation.The list of values describes alternative security schemes that can be used(that is, there is a logical OR between the security requirements).This definition overrides any declared top - level security.To remove a top - level security declaration, an empty array can be used.
         */
        security?: Array<SecurityRequirementObject>;
    }
    /**
     A container for the expected responses of an operation. The container maps a HTTP response code to the expected response. It is not expected from the documentation to necessarily cover all possible HTTP response codes, since they may not be known in advance. However, it is expected from the documentation to cover a successful operation response and any known errors.

     The default can be used a default response object for all HTTP codes that are not covered individually by the specification.

     The Responses Object MUST contain at least one response code, and it SHOULD be the response for a successful operation call.
     */
    export interface ResponsesObject {
        /**
         *The documentation of responses other than the ones declared for specific HTTP response codes.It can be used to cover undeclared responses.Reference Object can be used to link to a response that is defined at the Swagger Object's responses section.
         */
            default?: ResponseObject;
        /**
         *Any HTTP status code can be used as the property name (one property per HTTP status code). Describes the expected response for that HTTP status code. Reference Object can be used to link to a response that is defined at the Swagger Object's responses section.
         */
        [httpStatusCode: number]: ResponseObject;
    }

    /**
     *Describes a single response from an API Operation.
     */
    export interface ResponseObject {
        /**
         *Required. A short description of the response. GFM syntax can be used for rich text representation.
         */
        description: string;
        /**
         *A definition of the response structure.It can be a primitive, an array or an object.If this field does not exist, it means no content is returned as part of the response.As an extension to the Schema Object, its root type value may also be "file".This SHOULD be accompanied by a relevant produces mime - type.
         */
        schema?: SchemaObject;
        /**
         *A list of headers that are sent with the response.
         */
        headers?: HeadersObject;
        /**
         *An example of the response message.
         */
        examples?: ExampleObject;
    }

    /**
     *Lists the headers that can be sent as part of a response.
     */
    export interface HeadersObject {
        /**
         *The name of the property corresponds to the name of the header. The value describes the type of the header.
         */
        [name: string]: HeaderObject;
    }
    export interface HeaderObject extends ItemsObject {
        /**
         *A short description of the header.
         */
        description?: string;
    }
    /**
     *Allows sharing examples for operation responses.
     */
    export interface ExampleObject {
        /**
         *The name of the property MUST be one of the Operation produces values (either implicit or inherited). The value SHOULD be an example of what such a response would look like.
         */
        [mimeType: string]: any;
    }

    /**Describes a single operation parameter.

     A unique parameter is defined by a combination of a name and location.

     There are five possible parameter types.

     Path - Used together with Path Templating, where the parameter value is actually part of the operation's URL. This does not include the host or base path of the API. For example, in /items/{itemId}, the path parameter is itemId.
     Query - Parameters that are appended to the URL. For example, in /items?id=###, the query parameter is id.
     Header - Custom headers that are expected as part of the request.
     Body - The payload that's appended to the HTTP request. Since there can only be one payload, there can only be one body parameter. The name of the body parameter has no effect on the parameter itself and is used for documentation purposes only. Since Form parameters are also in the payload, body and form parameters cannot exist together for the same operation.
     Form - Used to describe the payload of an HTTP request when either application/x-www-form-urlencoded or multipart/form-data are used as the content type of the request (in Swagger's definition, the consumes property of an operation). This is the only parameter type that can be used to send files, thus supporting the file type. Since form parameters are sent in the payload, they cannot be declared together with a body parameter for the same operation. Form parameters have a different format based on the content-type used (for further details, consult http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4):
     application/x-www-form-urlencoded - Similar to the format of Query parameters but as a payload. For example, foo=1&bar=swagger - both foo and bar are form parameters. This is normally used for simple parameters that are being transferred.
     multipart/form-data - each parameter takes a section in the payload with an internal header. For example, for the header Content-Disposition: form-data; name="submit-name" the name of the parameter is submit-name. This type of form parameters is more commonly used for file transfers.

     */
    export interface ParameterObject {
        /**
         Required. The name of the parameter. Parameter names are case sensitive.

         If in is "path", the name field MUST correspond to the associated path segment from the path field in the Paths Object. See Path Templating for further information.
         For all other cases, the name corresponds to the parameter name used based on the in property.
         */
        name: string;
        /**
         *Required.The location of the parameter.Possible values are "query", "header", "path", "formData" or "body".
         */
            in: string;
        /**
         *A brief description of the parameter.This could contain examples of use.GFM syntax can be used for rich text representation.
         */
        description?: string;
        /**
         *Determines whether this parameter is mandatory.If the parameter is in "path", this property is required and its value MUST be true.Otherwise, the property MAY be included and its default value is false.
         */
        required?: boolean;
    }

    /**
     *in must be body
     */
    export interface BodyParameterObject extends ParameterObject {
        /**
         *Required. The schema defining the type used for the body parameter.
         */
        schema: SchemaObject;
    }

    /**
     *in must not be body
     */
    export interface SimpleParameterObject extends ParameterObject, ItemsObject {
    }

    /**
     *An limited subset of JSON-Schema's items object. It is used by parameter definitions that are not located in "body".
     */
    export interface ItemsObject {
        /**
         *Required. The type of the parameter. Since the parameter is not located at the request body, it is limited to simple types (that is, not an object). The value MUST be one of "string", "number", "integer", "boolean", "array" or "file". If type is "file", the consumes MUST be either "multipart/form-data" or " application/x-www-form-urlencoded" and the parameter MUST be in "formData".
         */
        type: string;
        /**
         *The extending format for the previously mentioned type.See Data Type Formats for further details.
         */
        format?: string;
        /**
         *Required if type is "array".Describes the type of items in the array.
         */
        items?: ItemsObject;
        /**
         *Determines the format of the array if type array is used.Possible values are:
         csv - comma separated values foo, bar.
         ssv - space separated values foo bar.
         tsv - tab separated values foo\tbar.
         pipes - pipe separated values foo | bar.
         multi - corresponds to multiple parameter instances instead of multiple values for a single instance foo = bar & foo = baz.This is valid only for parameters in "query" or "formData".

         Default value is csv.
         */
        collectionFormat?: string;
        /**
         *Sets a default value to the parameter.The type of the value depends on the defined type.See http://json-schema.org/latest/json-schema-validation.html#anchor101.
         */
            default?: any;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor17.
         */
        maximum?: number;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor17.
         */
        exclusiveMaximum?: boolean;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor21.
         */
        minimum?: number;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor21.
         */
        exclusiveMinimum?: boolean;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor26.
         */
        maxLength?: number;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor29.
         */
        minLength?: number;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor33.
         */
        pattern?: string;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor42.
         */
        maxItems?: number;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor45.
         */
        minItems?: number;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor49.
         */
        uniqueItems?: boolean;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor76.
         */
            enum?: Array<any>;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor14.
         */
        multipleOf?: number;
    }

    /**
     The Schema Object allows the definition of input and output data types. These types can be objects, but also primitives and arrays. This object is based on the JSON Schema Specification Draft 4 and uses a predefined subset of it. On top of this subset, there are extensions provided by this specification to allow for more complete documentation.

     The following properties are taken directly from the JSON Schema definition and follow the same specifications:

     $ref
     format (See Data Type Formats for further details)
     title
     description (GFM syntax can be used for rich text representation)
     default
     multipleOf
     maximum
     exclusiveMaximum
     minimum
     exclusiveMinimum
     maxLength
     minLength
     pattern
     maxItems
     minItems
     uniqueItems
     maxProperties
     minProperties
     required
     enum
     type

     The following properties are taken from the JSON Schema definition but their definitions were adjusted to the Swagger Specification. Their definition is the same as the one from JSON Schema, only where the original definition references the JSON Schema definition, the Schema Object definition is used instead.

     items
     allOf
     properties

     Other than the JSON Schema subset fields, the following fields may be used for further schema documentation.
     */
    export interface SchemaObject {
        /**
         *Adds support for polymorphism.The discriminator is the schema property name that is used to differentiate between other schemas that inherit this schema.The property name used MUST be defined at this schema and it MUST be in the required property list.When used, the value MUST be the name of this schema or any schema that inherits it.
         */
        discriminator?: string;
        /**
         *Relevant only for Schema "properties" definitions.Declares the property as "read only".This means that it MAY be sent as part of a response but MUST NOT be sent as part of the request.Properties marked as readOnly being true SHOULD NOT be in the required list of the defined schema.Default value is false.
         */
        readOnly?: boolean;
        /**
         *This MAY be used only on properties schemas.It has no effect on root schemas.Adds Additional metadata to describe the XML representation format of this property.
         */
        xml?: XMLObject;
        /**
         *Additional external documentation for this schema.
         */
        externalDocs?: ExternalDocumentationObject;
        /**
         *A free - form property to include a an example of an instance for this schema.
         */
        example?: any;


        /**
         *The extending format for the previously mentioned type.See Data Type Formats for further details.
         */
        format?: string;

        /**
         *http://json-schema.org/latest/json-schema-validation.html#anchor98
         */
        title?: string;

        /**
         *http://json-schema.org/latest/json-schema-validation.html#anchor98
         */
        description?: string;

        /**
         *Sets a default value to the parameter.The type of the value depends on the defined type.See http://json-schema.org/latest/json-schema-validation.html#anchor101.
         */
            default?: any;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor17.
         */
        maximum?: number;

        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor14.
         */
        multipleOf?: number;

        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor17.
         */
        exclusiveMaximum?: boolean;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor21.
         */
        minimum?: number;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor21.
         */
        exclusiveMinimum?: boolean;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor26.
         */
        maxLength?: number;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor29.
         */
        minLength?: number;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor33.
         */
        pattern?: string;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor42.
         */
        maxItems?: number;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor45.
         */
        minItems?: number;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor49.
         */
        uniqueItems?: boolean;
        /**
         *An object instance is valid against "maxProperties" if its number of properties is less than, or equal to, the value of this keyword.
         */
        maxProperties: number;
        /**
         *An object instance is valid against "minProperties" if its number of properties is greater than, or equal to, the value of this keyword.
         */
        minProperties: number;
        /**
         *See http://json-schema.org/latest/json-schema-validation.html#anchor76.
         */
            enum?: Array<any>;
        /**
         *An object instance is valid against this keyword if its property set contains all elements in this keyword's array value.
         */
        required: Array<string>;

        /**
         *
         */
        type?: string;

        /**
         *Required if type is "array".Describes the type of items in the array.
         */
        items?: SchemaObject;
        /**
         *An instance validates successfully against this keyword if it validates successfully against all schemas defined by this keyword's value.
         */
        allOf?: Array<SchemaObject>;

        /**
         *
         */
        properties?: PropertiesObject;
        
        $ref?:string;
    }

    export interface PropertiesObject {
        [property: string]: SchemaObject;
    }

    /**
     *A metadata object that allows for more fine-tuned XML model definitions.
     */
    export interface XMLObject {
        /**
         *Replaces the name of the element/attribute used for the described schema property.
         */
        name?: string;
        /**
         *The URL of the namespace definition.Value SHOULD be in the form of a URL.
         */
        namespace?: string;
        /**
         *The prefix to be used for the name.
         */
        prefix?: string;
        /**
         *Declares whether the property definition translates to an attribute instead of an element.Default value is false.
         */
        attribute?: boolean;
        /**
         *MAY be used only for an array definition.Signifies whether the array is wrapped (for example, <books><book/ ><book/ ></books>) or unwrapped (<book/ ><book/>). Default value is false.
         */
        wrapped?: boolean;
    }

    /**
     *An object to hold data types that can be consumed and produced by operations. These data types can be primitives, arrays or models.
     */
    export interface DefinitionsObject {
        /**
         *A single definition, mapping a "name" to the schema it defines.
         */
        [name: string]: SchemaObject;
    }

    /**
     An object to hold parameters to be reused across operations. Parameter definitions can be referenced to the ones defined here.

     This does not define global operation parameters.
     */
    export interface ParametersDefinitionsObject {
        /**
         *A single parameter definition, mapping a "name" to the parameter it defines.
         */
        [name: string]: ParameterObject;
    }

    /**
     An object to hold responses to be reused across operations. Response definitions can be referenced to the ones defined here.

     This does not define global operation responses.
     */
    export interface ResponsesDefinitionsObject {
        /**
         A single response definition, mapping a "name" to the response it defines.
         */
        [name: string]: ResponseObject;
    }

    /**
     *
     */
    export interface SecurityDefinitionsObject {
        /**
         A single security scheme definition, mapping a "name" to the scheme it defines.
         */
        [name: string]: SecuritySchemeObject;
    }

    /**
     *Allows the definition of a security scheme that can be used by the operations. Supported schemes are basic authentication, an API key (either as a header or as a query parameter) and OAuth2's common flows (implicit, password, application and access code).
     */
    export interface SecuritySchemeObject {
        /**
         *Required. The type of the security scheme. Valid values are "basic", "apiKey" or "oauth2".
         */
        type: string;
        /**
         *A short description for security scheme.
         */
        description?: string;
        /**
         *Required.The name of the header or query parameter to be used.
         */
        name: string;
        /**
         *Required The location of the API key.Valid values are "query" or "header".
         */
            in: string;
        /**
         *Required.The flow used by the OAuth2 security scheme.Valid values are "implicit", "password", "application" or "accessCode".
         */
        flow: string;
        /**
         *Required.The authorization URL to be used for this flow.This SHOULD be in the form of a URL.
         */
        authorizationUrl: string;
        /**
         *Required.The token URL to be used for this flow.This SHOULD be in the form of a URL.
         */
        tokenUrl: string;
        /**
         *Required.The available scopes for the OAuth2 security scheme.
         */
        scopes: ScopesObject;
    }

    /**
     *Lists the available scopes for an OAuth2 security scheme.
     */
    export interface ScopesObject {
        /**
         *Maps between a name of a scope to a short description of it (as the value of the property).
         */
        [name: string]: string;
    }

    /**
     Lists the required security schemes to execute this operation. The object can have multiple security schemes declared in it which are all required (that is, there is a logical AND between the schemes).

     The name used for each property MUST correspond to a security scheme declared in the Security Definitions.
     */
    export interface SecurityRequirementObject {
        /**
         *Each name must correspond to a security scheme which is declared in the Security Definitions. If the security scheme is of type "oauth2", then the value is a list of scope names required for the execution. For other security scheme types, the array MUST be empty.
         */
        [name: string]: string;
    }

    /**
     *A simple object to allow referencing other definitions in the specification. It can be used to reference parameters and responses that are defined at the top level for reuse.
     */
    export interface ReferenceObject {
        /**
         *Required. The reference string.
         */
        $ref: string;
    }

    /**
     *Allows adding meta data to a single tag that is used by the Operation Object. It is not mandatory to have a Tag Object per tag used there.
     */
    export interface TagObject {
        /**
         *Required. The name of the tag.
         */
        name: string;
        /**
         *A short description for the tag.GFM syntax can be used for rich text representation.
         */
        description?: string;
        /**
         *Additional external documentation for this tag.
         */
        externalDocs: ExternalDocumentationObject;
    }

    /**
     *Allows referencing an external resource for extended documentation.
     */
    export interface ExternalDocumentationObject {
        /**
         *A short description of the target documentation. GFM syntax can be used for rich text representation.
         */
        description?: string;
        /**
         *Required.The URL for the target documentation.Value MUST be in the format of a URL.
         */
        url: string;
    }
    export interface ContactObject {
        /**
         *The identifying name of the contact person/ organization.
         */
        name?: string;
        /**
         *The URL pointing to the contact information.MUST be in the format of a URL.
         */
        url?: string;
        /**
         *The email address of the contact person / organization.MUST be in the format of an email address.
         */
        email?: string;
    }
    export interface LicenseObject {
        /**
         *Required. The license name used for the API.
         */
        name?: string;
        /**
         *A URL to the license used for the API.MUST be in the format of a URL.}
         */
        url?: string;
    }
}
