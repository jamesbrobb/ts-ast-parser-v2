import * as ts from "typescript";
import {DeclarationKind} from "../declaration-kind.types";
import {DeclarationDefinition} from "../declaration-definition.types";
import {getModifiers, Modifiers, setAccess} from "./modifiers";
import {TypeParameterDeclaration} from "./type";
import {ParameterDeclaration} from "./parameter";
import {AccessTypes} from "./common";


export type GetAccessorDeclaration = {
  name: string
  access: AccessTypes
  type?: string
  typeParameters?: TypeParameterDeclaration[]
  parameters: ParameterDeclaration[]
  modifiers?: Modifiers,
  asteriskToken?: boolean
  questionToken?: boolean
  exclamationToken?: boolean
} & DeclarationKind<ts.GetAccessorDeclaration>


export const getAccessorDeclarationDefinition: DeclarationDefinition<GetAccessorDeclaration> = {
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


export function isGetAccessorDeclaration(dec: DeclarationKind<any>): dec is GetAccessorDeclaration {
  return dec.kind === ts.SyntaxKind[ts.SyntaxKind.GetAccessor];
}

export function isPublicGetAccessorDeclaration(dec: GetAccessorDeclaration): dec is GetAccessorDeclaration & { access: 'public' } {
  return isGetAccessorDeclaration(dec) && dec.access === 'public';
}
