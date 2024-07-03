import * as ts from "typescript";
import {getModifierKeywords, getModifiers, ModifierKeywords, Modifiers, setAccess} from "./modifiers";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";
import {TypeReferenceNode} from "./type";
import {Expression} from "./expressions";
import {AccessTypes} from "./common";



export type PropertyDeclaration = {
  name: string
  access: AccessTypes
  optional: boolean
  exclamation: boolean
  type?: TypeReferenceNode
  initializedValue?: Expression | string
  modifiers?: Modifiers
} & DeclarationKind<ts.PropertyDeclaration>


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
  },
  postProcess: [
    setAccess
  ]
}


export type PropertySignature = {
  name: string
  optional: boolean
  type?: string
  keywords?: ModifierKeywords[]
} & DeclarationKind<ts.PropertySignature>


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


export function isPropertyDeclaration(dec: DeclarationKind<any>): dec is PropertyDeclaration {
  return dec.kind === ts.SyntaxKind[ts.SyntaxKind.PropertyDeclaration];
}

export function isPublicPropertyDeclaration(dec: DeclarationKind<any>): dec is PropertyDeclaration & {access: 'public'} {
  return isPropertyDeclaration(dec) && dec.access === 'public';
}

export function isPropertySignature(dec: DeclarationKind<any>): dec is PropertySignature {
  return dec.kind === ts.SyntaxKind[ts.SyntaxKind.PropertySignature];
}


/*function getSignature(name: string, modifiers?: Modifiers, optional?: boolean, exclamation?: boolean, type?: string, initializedValue?: string): string {

  const decorators = getDecoratorsAsString(modifiers),
    keywords = getKeywordsAsString(modifiers);

  return `${decorators}${keywords}${name}${optional ? '?' : ''}${exclamation ? '!' : ''}${type ? ': ' + type : ''}${initializedValue ? ' = ' + initializedValue : ''}`;
}*/
