import * as ts from "typescript";
import {getModifierKeywords, Modifiers} from "./modifiers";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition, DeclarationPostProcessFn} from "../declaration-definition.types";
import {Parser} from "../declaration-parser";
import {getImportsMapElementByName, Maps} from "../../maps";
import {Expression} from "./expressions";
import {ParameterDeclaration} from "./parameter";


const assignedResolvedPath: DeclarationPostProcessFn<ts.TypeReferenceNode, TypeReferenceNode> = (
  dec: TypeReferenceNode,
  node: ts.TypeReferenceNode,
  sourceFile: ts.SourceFile,
  parser: Parser<any, any>,
  maps? : Maps
) => {
  if(!maps || !maps.imports) {
    return;
  }

  const mapElement = getImportsMapElementByName(maps.imports, dec.name),
    resolvedPath = mapElement ? mapElement.convertedModulePath || mapElement.resolvedModulePath : null;

  if(!resolvedPath) {
    return;
  }

  dec.resolvedPath = resolvedPath;
}


export type TypeNode = TypeReferenceNode | TypeLiteral | IndexedAccessTypeNode | ArrayTypeNode | UnionTypeNode | LiteralTypeNode | FunctionTypeNode | ExpressionWithTypeArguments | TypeParameterDeclaration | TypeAliasDeclaration;


export type TypeParameterDeclaration = {
  name: string
  constraint?: TypeNode
  default?: TypeNode
  modifiers?: Modifiers
  expression: Expression
} & DeclarationKind<ts.TypeParameterDeclaration>

export const typeParameterDeclarationDefinition: DeclarationDefinition<TypeParameterDeclaration> = {
  props: ['name', 'constraint', 'default', 'modifiers'],
  propHandlers: {
    modifiers: {
      propName: 'keywords',
      parseFn: getModifierKeywords
    }
  },
  signatureCreationFn: createTypeParameterSignature
}


export type TypeReferenceNode = {
  name: string
  typeArguments?: TypeNode[]
  resolvedPath?: string
} & DeclarationKind<ts.TypeReferenceNode>

export const typeReferenceDefinition: DeclarationDefinition<TypeReferenceNode> = {
  props: ['typeName', 'typeArguments'],
  propHandlers: {
    typeName: {
      propName: 'name'
    }
  },
  postProcess: [
    assignedResolvedPath
  ],
  signatureCreationFn: createTypeReferenceSignature
}

export type ExpressionWithTypeArguments = {
  expression: string
  typeArguments?: TypeNode[]
} & DeclarationKind<ts.ExpressionWithTypeArguments>

export const expressionWithTypeArgumentsDefinition: DeclarationDefinition<ExpressionWithTypeArguments> = {
  props: ['expression', 'typeArguments'],
  signatureCreationFn: (dec: ExpressionWithTypeArguments) => {
    return `${dec.expression}${dec.typeArguments ? `<${dec.typeArguments.map(arg => arg.signature).join(', ')}>` : ''}`;
  }
}


export type TypeAliasDeclaration = {
  name: string
  modifiers?: Modifiers
  typeParameters?: TypeParameterDeclaration[]
  type: TypeNode
} & DeclarationKind<ts.TypeAliasDeclaration>

export const typeAliasDeclarationDefinition: DeclarationDefinition<TypeAliasDeclaration> = {
  props: ['name', 'typeParameters', 'type', 'modifiers'],
  signatureCreationFn: (dec: TypeAliasDeclaration) => {
    return `type ${dec.name}${dec.typeParameters ? `<${dec.typeParameters.map(param => param.signature).join(', ')}>` : ''} = ${dec.type.signature}`;
  }
}


export type TypeLiteral = {
  members: TypeElement[],
} & DeclarationKind<ts.TypeLiteralNode>

export const typeLiteralDefinition: DeclarationDefinition<TypeLiteral> = {
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
  signatureCreationFn: (dec: TypeLiteral) => {
    return `{ ${dec.members.map(member => `${member.name}${member.optional ? '?' : ''}: ${member.signature}`).join(', ')} }`;
  }
}


export type TypeElement = {
  name: string
  optional?: boolean
} & DeclarationKind<ts.TypeElement>

export const typeElementDefinition: DeclarationDefinition<TypeElement> = {
  props: ['name', 'questionToken'],
  propHandlers: {
    questionToken: {
      propName: 'optional'
    }
  },
  signatureCreationFn: (dec: TypeElement) => `${dec.name}${dec.optional ? '?' : ''}`
}


export type IndexedAccessTypeNode = {
  objectType: TypeNode
  indexType: TypeNode
} & DeclarationKind<ts.IndexedAccessTypeNode>

export const indexedAccessTypeNodeDefinition: DeclarationDefinition<IndexedAccessTypeNode> = {
  props: ['objectType', 'indexType'],
  signatureCreationFn: (dec: IndexedAccessTypeNode) => {
    return `${dec.objectType.signature}[${dec.indexType.signature}]`;
  }
}


export type ArrayTypeNode = {
  elementType: TypeNode
} & DeclarationKind<ts.ArrayTypeNode>

export const arrayTypeNodeDefinition: DeclarationDefinition<ArrayTypeNode> = {
  props: ['elementType'],
  signatureCreationFn: (dec: ArrayTypeNode) => `${dec.elementType.signature}[]`
}


export type UnionTypeNode = {
  types: TypeNode[]
} & DeclarationKind<ts.UnionTypeNode>

export const unionTypeNodeDefinition: DeclarationDefinition<UnionTypeNode> = {
  removeKind: true,
  props: ['types'],
  signatureCreationFn: (dec: UnionTypeNode) => {
    return dec.types.map(type => type.signature).join(' | ');
  }
}


export type LiteralTypeNode = {
  value: string
} & DeclarationKind<ts.LiteralTypeNode>

export const literalTypeNodeDefinition: DeclarationDefinition<LiteralTypeNode> = {
  props: ['literal'],
  propHandlers: {
    literal: { propName: 'value' }
  },
  signatureCreationFn: (dec: LiteralTypeNode) => dec.value
}


export type FunctionTypeNode = {
  name: string
  parameters: ParameterDeclaration[]
  type?: TypeNode
  typeParameters?: TypeParameterDeclaration[]
  signature: string
} & DeclarationKind<ts.FunctionTypeNode>

export const functionTypeDefinition: DeclarationDefinition<FunctionTypeNode> = {
  props: ['name', 'parameters', 'type', 'typeParameters'],
  signatureCreationFn: (dec: FunctionTypeNode) => {
    return `(${dec.parameters.map(param => param.signature).join(', ')}) => ${dec.type ? dec.type.signature : 'void'}`;
  }
}


export function createTypeParameterSignature(dec: TypeParameterDeclaration): string {
  return `${dec.name}${dec.constraint ? ` extends ${dec.constraint.signature}` : ''}${dec.default ? ` = ${dec.default}` : ''}`;
}

export function createTypeReferenceSignature(dec: TypeReferenceNode): string {
  return `${dec.name}${dec.typeArguments ? `<${dec.typeArguments.map(arg => arg.signature).join(', ')}>` : ''}`;
}


export function isTypeReferenceNode(node: any): node is TypeReferenceNode {
  return !!node && !!node.kind && node.kind === ts.SyntaxKind[ts.SyntaxKind.TypeReference];
}


// TODO - remove this and allow the parser/map to handle it
/*export function getType(node: ts.TypeNode, sourceFile: ts.SourceFile, parser: Parser<any, any>): string | any {

  if(ts.isTypeReferenceNode(node) || ts.isTypeLiteralNode(node)) {
    return parser.parse(node, sourceFile);
  }

  if(ts.isTypeElement(node)) {
    // TODO - work out how to move this to parse map
    return {
      name: parser.parse(node.name, sourceFile),
      optional: !!node.questionToken
    }
  }

  if(ts.isUnionTypeNode(node)) {
    return node.types.map(type => getType(type, sourceFile, parser));
  }

  return parser.parse(node, sourceFile);
}*/

