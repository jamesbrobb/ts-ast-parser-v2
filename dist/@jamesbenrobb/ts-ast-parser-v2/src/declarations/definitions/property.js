import { getType } from "./type";
export const propertyDeclarationDefinition = {
    props: ['name', 'type', 'questionToken', 'exclamationToken', 'initializer', 'modifiers'],
    propHandlers: {
        questionToken: {
            propName: 'optional',
            parseFn: (value) => !!value // these have syntaxkind - add to parse map
        },
        exclamationToken: {
            propName: 'exclamation',
            parseFn: (value) => !!value // these have syntaxkind - add to parse map
        },
        initializer: {
            propName: 'initializedValue'
        }
    }
};
export const propertySignatureDefinition = {
    props: ['name', 'type', 'questionToken', 'modifiers'],
    propHandlers: {
        questionToken: {
            propName: 'optional',
            parseFn: (value) => !!value // these have syntaxkind - add to parse map
        },
        type: {
            parseFn: getType
        }
    }
};
/*function getSignature(name: string, modifiers?: Modifiers, optional?: boolean, exclamation?: boolean, type?: string, initializedValue?: string): string {

  const decorators = getDecoratorsAsString(modifiers),
    keywords = getKeywordsAsString(modifiers);

  return `${decorators}${keywords}${name}${optional ? '?' : ''}${exclamation ? '!' : ''}${type ? ': ' + type : ''}${initializedValue ? ' = ' + initializedValue : ''}`;
}*/
//# sourceMappingURL=property.js.map