import * as ts from "typescript";
import {getModifiers, Modifiers, setAccess} from "./modifiers";
import {DeclarationKind} from "../declaration-kind.types";
import {ParameterDeclaration} from "./parameter";
import {DeclarationDefinition} from "../declaration-definition.types";
import {TypeParameterDeclaration} from "./type";
import {AccessTypes} from "./common";


export type SetAccessorDeclaration = {
  name: string
  access: AccessTypes
  type?: string
  typeParameters?: TypeParameterDeclaration[]
  parameters: ParameterDeclaration[]
  modifiers?: Modifiers,
  asteriskToken?: boolean
  questionToken?: boolean
  exclamationToken?: boolean
} & DeclarationKind<ts.SetAccessorDeclaration>;


const props = [
  'name',
  'type',
  'typeParameters',
  'parameters',
  'modifiers',
  'asteriskToken',
  'questionToken',
  'exclamationToken'
] as const;

export const setAccessorDeclarationDefinition: DeclarationDefinition<
  SetAccessorDeclaration,
  typeof props
> = {
  props,
  propHandlers: {
    modifiers: getModifiers,
  },
  postProcess: [
    setAccess
  ]
}


export function isSetAccessorDeclaration(dec: DeclarationKind<any>): dec is SetAccessorDeclaration {
  return dec.kind === ts.SyntaxKind[ts.SyntaxKind.SetAccessor];
}

export function isPublicSetAccessorDeclaration(dec: SetAccessorDeclaration): dec is SetAccessorDeclaration & { access: 'public' } {
  return isSetAccessorDeclaration(dec) && dec.access === 'public';
}
