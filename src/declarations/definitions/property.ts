import * as ts from "typescript";
import {
  getDecoratorsAsString, getKeywordsAsString,
  getModifierKeywords,
  getModifiers, isDecoratedWith,
  ModifierKeywords,
  Modifiers,
  setAccess
} from "./modifiers";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";
import {TypeNode} from "./type";
import {Expression} from "./expressions";
import {AccessTypes} from "./common";
import {findKeyWithValue} from "../../utils";



export type PropertyDeclaration = {
  name: string
  access: AccessTypes
  optional: boolean
  exclamation: boolean
  type?: TypeNode
  initializedValue?: Expression | string
  modifiers?: Modifiers
} & DeclarationKind<ts.PropertyDeclaration>

const propDecProps = [
  'name',
  'type',
  'questionToken',
  'exclamationToken',
  'initializer',
  'modifiers'
] as const

export const propertyDeclarationDefinition: DeclarationDefinition<
  PropertyDeclaration,
  typeof propDecProps
> = {
  props: propDecProps,
  propHandlers: {
    questionToken: { propName: 'optional' },
    exclamationToken: { propName: 'exclamation' },
    initializer: { propName: 'initializedValue' },
    modifiers: getModifiers
  },
  postProcess: [
    setAccess
  ],
  signatureCreationFn: createPropertyDeclarationSignature
}


export type PropertySignature = {
  name: string
  optional: boolean
  type?: string
  keywords?: ModifierKeywords[]
} & DeclarationKind<ts.PropertySignature>

const propSigProps = [
  'name',
  'type',
  'questionToken',
  'modifiers'
] as const

export const propertySignatureDefinition: DeclarationDefinition<
  PropertySignature,
  typeof propSigProps
> = {
  props: propSigProps,
  propHandlers: {
    questionToken: { propName: 'optional' },
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


export function checkPropertyForKeyWithValue(property: PropertyDeclaration, key: string, value: string): boolean {

  if(isDecoratedWith(value, property.modifiers)) {
    return true;
  }

  if (typeof property.initializedValue === 'string') {
    return property.initializedValue === value;
  }

  return findKeyWithValue(property.initializedValue, key, value);
}


function createPropertyDeclarationSignature(dec: PropertyDeclaration): string {

  const decorators = getDecoratorsAsString(dec.modifiers),
    keywords = getKeywordsAsString(dec.modifiers);

  let initializedValue = '';

  if(dec.initializedValue) {
    if(typeof dec.initializedValue === 'string') {
      initializedValue = dec.initializedValue;
    } else {
      initializedValue = dec.initializedValue.signature || '';
    }
  }

  return `${decorators}${keywords}${dec.name}${dec.optional ? '?' : ''}${dec.exclamation ? '!' : ''}${dec.type ? ': ' + dec.type.signature : ''}${initializedValue ? ' = ' + initializedValue : ''}`;
}
