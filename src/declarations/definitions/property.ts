import * as ts from "typescript";
import {Modifiers} from "./modifiers";
import {getType} from "./type";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";


export type PropertyDeclaration = {
  name: string,
  optional: boolean,
  exclamation: boolean,
  signature: string,
  raw: string
  type?: string,
  initializedValue?: string,
} & DeclarationKind<ts.PropertyDeclaration> & Modifiers;


export const propertyDeclarationDefinition: DeclarationDefinition<PropertyDeclaration> = {
  props: ['name', 'type', 'questionToken', 'exclamationToken', 'initializer', 'modifiers'],
  propHandlers: {
    questionToken: {
      propName: 'optional',
      parseFn: (value: ts.QuestionToken) => !!value // these have syntaxkind - add to parse map
    },
    exclamationToken: {
      propName: 'exclamation',
      parseFn: (value: ts.ExclamationToken) => !!value // these have syntaxkind - add to parse map
    },
    initializer: {
      propName: 'initializedValue'
    }
  }
}


export type PropertySignature = {
  name: string,
  optional: boolean,
  type?: string,
  signature: string,
  raw: string
} & DeclarationKind<ts.PropertySignature> & Modifiers;


export const propertySignatureDefinition: DeclarationDefinition<PropertySignature> = {
  props: ['name', 'type', 'questionToken', 'modifiers'],
  propHandlers: {
    questionToken: {
      propName: 'optional',
      parseFn: (value: ts.QuestionToken) => !!value // these have syntaxkind - add to parse map
    },
    type: {
      parseFn: getType
    }
  }
}


export type PropertyAccessExpression = {
  name: string,
  expression: string,
  optional: boolean
} & DeclarationKind<ts.PropertyAccessExpression>;

export const propertyAccessExpressionDefinition: DeclarationDefinition<PropertyAccessExpression> = {
  props: ['name', 'expression', 'questionDotToken'],
  propHandlers: {
    questionDotToken: {
      propName: 'optional',
      parseFn: (value: ts.QuestionDotToken) => !!value
    }
  }
}


/*function getSignature(name: string, modifiers?: Modifiers, optional?: boolean, exclamation?: boolean, type?: string, initializedValue?: string): string {

  const decorators = getDecoratorsAsString(modifiers),
    keywords = getKeywordsAsString(modifiers);

  return `${decorators}${keywords}${name}${optional ? '?' : ''}${exclamation ? '!' : ''}${type ? ': ' + type : ''}${initializedValue ? ' = ' + initializedValue : ''}`;
}*/
