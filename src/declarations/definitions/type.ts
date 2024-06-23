import * as ts from "typescript";
import {Modifiers} from "./modifiers";
import {PropertySignature} from "./property";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";
import {Parser} from "../declaration-parser";


export type TypeParameterDeclaration = {
  name: string,
  constraint?: string,
  default?: string,
  // expression: Expression // TODO - check this out
  raw: string
} & DeclarationKind<ts.TypeParameterDeclaration> & Modifiers;

export const typeParameterDeclarationDefinition: DeclarationDefinition<TypeParameterDeclaration> = {
  props: ['name', 'constraint', 'default', 'modifiers']
}


export type TypeReferenceNode = {
  name: string,
  // typeArguments?: NodeArray<TypeNode> // TODO - check this out
  raw: string
} & DeclarationKind<ts.TypeReferenceNode>

export const typeReferenceDefinition: DeclarationDefinition<TypeReferenceNode> = {
  props: ['typeName', 'typeArguments'],
  propHandlers: {
    typeName: {
      propName: 'name'
    }
  }
}


export type ExpressionWithTypeArguments = {
  expression: string,
  typeArguments?: string[],
  raw: string
} & DeclarationKind<ts.ExpressionWithTypeArguments>

export const expressionWithTypeArgumentsDefinition: DeclarationDefinition<ExpressionWithTypeArguments> = {
  props: ['expression', 'typeArguments']
}


export type TypeAliasDeclaration = {
  name: string,
  typeParameters?: TypeParameterDeclaration[],
  type: string,
  raw: string
} & DeclarationKind<ts.TypeAliasDeclaration> & Modifiers;

export const typeAliasDeclarationDefinition: DeclarationDefinition<TypeAliasDeclaration> = {
  props: ['name', 'typeParameters', 'type', 'modifiers'],
  propHandlers: {
    type: {
      parseFn: getType
    }
  }
}


export type TypeLiteral = {
  members: ({kind: number, nodeType: string, raw: string} | PropertySignature) [],
  raw: string
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
}


export type TypeElement = {
  name: string,
  optional?: boolean
} & DeclarationKind<ts.TypeElement>

export const typeElementDefinition: DeclarationDefinition<TypeElement> = {
  props: ['name', 'questionToken'],
  propHandlers: {
    questionToken: {
      parseFn: (questionToken: ts.QuestionToken) => !!questionToken
    }
  }
}


// TODO - remove this and allow the parser/map to handle it
export function getType(node: ts.TypeNode, sourceFile: ts.SourceFile, parser: Parser<any>): string | any {

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
}

