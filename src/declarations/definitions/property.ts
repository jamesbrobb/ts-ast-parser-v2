import * as ts from "typescript";
import {getModifierKeywords, getModifiers, Modifiers} from "./modifiers";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";
import {TypeReferenceNode} from "./type";
import {Expression} from "./expressions";



export type PropertyDeclaration = {
  name: string,
  optional: boolean,
  exclamation: boolean,
  type?: TypeReferenceNode,
  initializedValue?: Expression | string,
  modifiers?: Modifiers
} & DeclarationKind<ts.PropertyDeclaration>;


export const propertyDeclarationDefinition: DeclarationDefinition<PropertyDeclaration> = {
  props: [
    'name',
    'type',
    'questionToken',
    'exclamationToken',
    'initializer',
    'modifiers'
  ],
  propHandlers: {
    questionToken: { propName: 'optional' },
    exclamationToken: { propName: 'exclamation' },
    initializer: { propName: 'initializedValue' },
    modifiers: getModifiers
  }
}


export type PropertySignature = {
  name: string,
  optional: boolean,
  type?: string,
  modifiers?: Modifiers
} & DeclarationKind<ts.PropertySignature>;


export const propertySignatureDefinition: DeclarationDefinition<PropertySignature> = {
  props: ['name', 'type', 'questionToken', 'modifiers'],
  propHandlers: {
    questionToken: { propName: 'optional' },
    /*type: {
      parseFn: getType
    },*/
    modifiers: {
      propName: 'keywords',
      parseFn: getModifierKeywords
    }
  }
}


/*function getSignature(name: string, modifiers?: Modifiers, optional?: boolean, exclamation?: boolean, type?: string, initializedValue?: string): string {

  const decorators = getDecoratorsAsString(modifiers),
    keywords = getKeywordsAsString(modifiers);

  return `${decorators}${keywords}${name}${optional ? '?' : ''}${exclamation ? '!' : ''}${type ? ': ' + type : ''}${initializedValue ? ' = ' + initializedValue : ''}`;
}*/
