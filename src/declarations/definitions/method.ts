import * as ts from "typescript";
import {ParameterDeclaration} from "./parameter";
import {getModifiers, Modifiers, setAccess} from "./modifiers";
import {TypeParameterDeclaration} from "./type";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";
import {AccessTypes} from "./common";


export type MethodDeclaration = {
  name: string
  access: AccessTypes
  type?: string
  typeParameters?: TypeParameterDeclaration[]
  parameters: ParameterDeclaration[]
  modifiers?: Modifiers,
  asteriskToken?: boolean
  questionToken?: boolean
  exclamationToken?: boolean
} & DeclarationKind<ts.MethodDeclaration>;


export const methodDeclarationDefinition: DeclarationDefinition<MethodDeclaration> = {
  props: [
    'name',
    'type',
    'typeParameters',
    'parameters',
    'modifiers',
    'asteriskToken',
    'questionToken',
    'exclamationToken',
  ],
  propHandlers: {
    modifiers: getModifiers
  },
  postProcess: [
    setAccess
  ]
}


export function isMethodDeclaration(dec: DeclarationKind<any>): dec is MethodDeclaration {
  return dec.kind === ts.SyntaxKind[ts.SyntaxKind.MethodDeclaration];
}

export function isPublicMethodDeclaration(dec: MethodDeclaration): dec is MethodDeclaration & { access: 'public' } {
  return isMethodDeclaration(dec) && dec.access === 'public';
}


/*function getMethodSignature(name: string, parameters: Parameter[], modifiers?: Modifiers, type: string = 'void'): string {

  const params = getParametersAsString(parameters),
    decorators = getDecoratorsAsString(modifiers),
    keywords = getKeywordsAsString(modifiers);

  return `${decorators}${keywords}${name}(${params}): ${type === 'void' && keywords.includes('async') ? 'Promise<void>' : type}`;
}*/
