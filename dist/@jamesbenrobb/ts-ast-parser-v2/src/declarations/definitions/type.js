import * as ts from "typescript";
export const typeParameterDeclarationDefinition = {
    props: ['name', 'constraint', 'default', 'modifiers']
};
export const typeReferenceDefinition = {
    props: ['typeName', 'typeArguments'],
    propHandlers: {
        typeName: {
            propName: 'name'
        }
    }
};
export const expressionWithTypeArgumentsDefinition = {
    props: ['expression', 'typeArguments']
};
export const typeAliasDeclarationDefinition = {
    props: ['name', 'typeParameters', 'type', 'modifiers'],
    propHandlers: {
        type: {
            parseFn: getType
        }
    }
};
export const typeLiteralDefinition = {
    props: ['members'],
    /*propHandlers: {
      members: {
        parseFn: (members) => {
          return members.map(member => {
  
            if(ts.isPropertySignature(member)) {
              return getPropertySignature(member, sourceFile, parser);
            }
  
            return {
              kind: member.kind,
              nodeType: ts.SyntaxKind[member.kind],
              raw: parser.parse(member, sourceFile)
            }
          })
        }
      }
    }*/
};
export const typeElementDefinition = {
    props: ['name', 'questionToken'],
    propHandlers: {
        questionToken: {
            parseFn: (questionToken) => !!questionToken
        }
    }
};
// TODO - remove this and allow the parser/map to handle it
export function getType(node, sourceFile, parser) {
    if (ts.isTypeReferenceNode(node) || ts.isTypeLiteralNode(node)) {
        return parser.parse(node, sourceFile);
    }
    if (ts.isTypeElement(node)) {
        // TODO - work out how to move this to parse map
        return {
            name: parser.parse(node.name, sourceFile),
            optional: !!node.questionToken
        };
    }
    if (ts.isUnionTypeNode(node)) {
        return node.types.map(type => getType(type, sourceFile, parser));
    }
    return parser.parse(node, sourceFile);
}
//# sourceMappingURL=type.js.map