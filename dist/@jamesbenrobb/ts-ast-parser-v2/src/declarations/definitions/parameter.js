export const parameterDeclarationDefinition = {
    props: ['name', 'questionToken', 'type', 'initializer', 'modifiers'],
    propHandlers: {
        questionToken: {
            propName: 'optional',
            parseFn: (value) => !!value
        }
    }
};
/*export function getParametersAsString(parameters: Parameter[], seperator = ', '): string {
  return parameters.map(param => param.signature).join(seperator);
}

function getParameterSignature(name: string, type?: string, optional?: boolean, initializedValue?: string): string {
  return `${name}${optional ? '?' : ''}${type ? ': ' + type : ''}${initializedValue ? ' = ' + initializedValue : ''}`;
}*/
//# sourceMappingURL=parameter.js.map